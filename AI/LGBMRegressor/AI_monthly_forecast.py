from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pandas as pd
import numpy as np
import time
import pickle
from datetime import datetime
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from lightgbm import LGBMRegressor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://takalefy-v2-0.pages.dev","http://localhost:5173/notifications"], 
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
DATASET_FILENAME = "DataSetٍٍSmall.csv"
MODEL_FILENAME = "expense_forecast_model.pkl"
TRAIN_MIN_DATE_FILENAME = "train_min_date.pkl"

def safe_float(val):
    if val is None:
        return None
    if isinstance(val, float):
        if np.isnan(val) or np.isinf(val):
            return None
    return float(val)

class UserEntry(BaseModel):
    date: str
    value: float
    type: str

class UserDataRequest(BaseModel):
    user_data: List[UserEntry]

@app.get("/forecast-from-local")
def forecast_from_local():
    start_time = time.time()
    print(f"[{datetime.now()}] Reading file from local directory: {DATASET_FILENAME}")

    try:
        df = pd.read_csv(DATASET_FILENAME)
    except Exception as e:
        return {"error": f"Failed to read file: {str(e)}"}

    df['ds'] = pd.to_datetime(df['date'])
    df['y'] = df.apply(lambda row: row['value'] if row['type'] == 'expense' else -row['value'], axis=1)

    today = pd.to_datetime("today").normalize()
    start_of_month = today.replace(day=1)
    end_of_month = today + pd.offsets.MonthEnd(1)

    df_expenses = df[df['y'] > 0].copy()
    df_incomes  = df[df['y'] < 0].copy()

    actual_income_so_far = -df_incomes[
        (df_incomes['ds'] >= start_of_month) & (df_incomes['ds'] < today)
    ]['y'].sum()
    actual_expense_so_far = df_expenses[
        (df_expenses['ds'] >= start_of_month) & (df_expenses['ds'] < today)
    ]['y'].sum()

    remaining_budget = actual_income_so_far - actual_expense_so_far
    days_left = (end_of_month - today).days + 1
    daily_allowance = remaining_budget / days_left if days_left > 0 else 0

    train_df = df_expenses[df_expenses['ds'] < start_of_month].copy()
    if train_df.empty:
        return {"error": "No expense data before current month for training."}

    test_df = df_expenses[
        (df_expenses['ds'] >= start_of_month) & (df_expenses['ds'] < today)
    ].copy()

    train_df['weekday'] = train_df['ds'].dt.weekday
    train_min_date = train_df['ds'].min()
    train_df['X'] = (train_df['ds'] - train_min_date).dt.days

    if not test_df.empty:
        test_df['weekday'] = test_df['ds'].dt.weekday
        test_df['X'] = (test_df['ds'] - train_min_date).dt.days

    model = LGBMRegressor(
        n_estimators=150,
        learning_rate=0.05,
        max_depth=5,
        random_state=42
    )
    model.fit(train_df[['X', 'weekday']], train_df['y'])

    with open(MODEL_FILENAME, 'wb') as f:
        pickle.dump(model, f)
    with open(TRAIN_MIN_DATE_FILENAME, 'wb') as f:
        pickle.dump(train_min_date, f)

    if not test_df.empty:
        y_true = test_df['y'].values
        y_pred = model.predict(test_df[['X', 'weekday']])

        r2 = r2_score(y_true, y_pred)
        mae = mean_absolute_error(y_true, y_pred)
        rmse = np.sqrt(mean_squared_error(y_true, y_pred))

        mask_nonzero = y_true != 0
        if mask_nonzero.sum() > 0:
            mape = np.mean(np.abs((y_true[mask_nonzero] - y_pred[mask_nonzero]) / y_true[mask_nonzero])) * 100
        else:
            mape = None
    else:
        r2 = mae = rmse = mape = None

    future_dates = pd.date_range(start=today, end=end_of_month)
    future_df = pd.DataFrame({"ds": future_dates})
    future_df['weekday'] = future_df['ds'].dt.weekday
    future_df['X'] = (future_df['ds'] - train_min_date).dt.days

    yhat_future = model.predict(future_df[['X', 'weekday']])
    predicted_expense_for_rest_of_month = float(np.sum(np.maximum(yhat_future, 0.0)))

    total_expected_expense = actual_expense_so_far + predicted_expense_for_rest_of_month
    budget_left = actual_income_so_far - total_expected_expense
    deficit_warning = bool(budget_left < 0)

    total_time = time.time() - start_time

    return {
        "model_used": "lightgbm_multiMonth_train",
        "actual_income_so_far": safe_float(actual_income_so_far),
        "actual_expense_so_far": safe_float(actual_expense_so_far),
        "predicted_expense_for_rest_of_month": safe_float(predicted_expense_for_rest_of_month),
        "total_expected_expense": safe_float(total_expected_expense),
        "budget_left": safe_float(budget_left),
        "days_left": days_left,
        "daily_allowance": safe_float(daily_allowance),
        "max_daily_expense_allowed_to_stay_within_income": safe_float(daily_allowance),
        "deficit_warning": deficit_warning,
        "model_metrics": {
            "mae": safe_float(mae),
            "rmse": safe_float(rmse),
            "accuracy": safe_float(100 - mape) if mape is not None else None,
            "r2": safe_float(r2)
        },
        "execution_time_sec": round(total_time, 2)
    }

@app.post("/predict-forecast")
def predict_forecast(request: UserDataRequest):
    start_time = time.time()

    try:
        with open(MODEL_FILENAME, 'rb') as f:
            model = pickle.load(f)
        with open(TRAIN_MIN_DATE_FILENAME, 'rb') as f:
            train_min_date = pickle.load(f)
    except Exception as e:
        return {"error": f"Model not trained yet. Please call /forecast-from-local first. Details: {str(e)}"}

    df = pd.DataFrame([entry.dict() for entry in request.user_data])
    df['ds'] = pd.to_datetime(df['date'])
    df['y'] = df.apply(lambda row: row['value'] if row['type'] == 'expense' else -row['value'], axis=1)

    today = pd.to_datetime("today").normalize()
    start_of_month = today.replace(day=1)
    end_of_month = today + pd.offsets.MonthEnd(1)

    df_expenses = df[df['y'] > 0].copy()
    df_incomes  = df[df['y'] < 0].copy()

    actual_income_so_far = -df_incomes[
        (df_incomes['ds'] >= start_of_month) & (df_incomes['ds'] < today)
    ]['y'].sum()
    actual_expense_so_far = df_expenses[
        (df_expenses['ds'] >= start_of_month) & (df_expenses['ds'] < today)
    ]['y'].sum()

    remaining_budget = actual_income_so_far - actual_expense_so_far
    days_left = (end_of_month - today).days + 1
    daily_allowance = remaining_budget / days_left if days_left > 0 else 0

    future_dates = pd.date_range(start=today, end=end_of_month)
    future_df = pd.DataFrame({"ds": future_dates})
    future_df['weekday'] = future_df['ds'].dt.weekday
    future_df['X'] = (future_df['ds'] - train_min_date).dt.days

    yhat_future = model.predict(future_df[['X', 'weekday']])
    predicted_expense_for_rest_of_month = float(np.sum(np.maximum(yhat_future, 0.0)))

    total_expected_expense = actual_expense_so_far + predicted_expense_for_rest_of_month
    budget_left = actual_income_so_far - total_expected_expense
    deficit_warning = bool(budget_left < 0)

    total_time = time.time() - start_time

    return {
        "model_used": "lightgbm_multiMonth_train",
        "actual_income_so_far": safe_float(actual_income_so_far),
        "actual_expense_so_far": safe_float(actual_expense_so_far),
        "predicted_expense_for_rest_of_month": safe_float(predicted_expense_for_rest_of_month),
        "total_expected_expense": safe_float(total_expected_expense),
        "budget_left": safe_float(budget_left),
        "days_left": days_left,
        "daily_allowance": safe_float(daily_allowance),
        "max_daily_expense_allowed_to_stay_within_income": safe_float(daily_allowance),
        "deficit_warning": deficit_warning,
        "model_metrics": {
            "mae": None,
            "rmse": None,
            "accuracy": None,
            "r2": None
        },
        "execution_time_sec": round(total_time, 2)
    }
