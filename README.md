# Takalefy_Ismaielia_GradProject
# Takalefy - Personal Finance Assistant

This project is composed of three main components:

* AI Service (FastAPI with machine learning models)
* Backend API (NestJS with Prisma)
* Frontend (React with Vite)

## 1. Backend Setup (NestJS)

### Installation

Navigate to the backend directory and install the required packages:

```bash
cd backend
npm install
```

### Prisma Configuration

Ensure the `.env` file is correctly configured with your database connection string. Then, generate the Prisma client and apply the migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

### Running the Development Server

To start the backend in development mode:

```bash
npm run start:dev
```

The backend will be available at: `http://localhost:3000`

---

## 2. Frontend Setup (React + Vite)

### Installation

Navigate to the frontend directory and install the required packages:

```bash
cd frontend
npm install
```

### Running the Development Server

To start the frontend development server:

```bash
npm run dev
```

The frontend will be available at: `http://localhost:5173`

---

## 3. AI Service Setup (FastAPI)

### Python Dependencies

Install the required Python packages using pip:

```bash
pip install fastapi uvicorn pandas numpy lightgbm scikit-learn pydantic
```

### Running the AI Server Locally

Ensure the file `AI_monthly_forecast.py` is in the current directory. Then run the server using:

```bash
uvicorn AI_monthly_forecast:app --reload
```

The AI service will be available at: `http://localhost:8000`

---

## 4. DevOps and Deployment

### Backend Deployment

The backend API is deployed on Azure and can be accessed at:

```
https://api.takalefy.hs.vc/
```

### Frontend Deployment

The frontend application is deployed on Cloudflare Pages and can be accessed at:

```
https://takalefy-v2-0.pages.dev/
```

---
