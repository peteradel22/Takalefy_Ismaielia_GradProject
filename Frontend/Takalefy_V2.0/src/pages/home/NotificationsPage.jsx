import React, { useEffect, useState } from "react";
import { fetchData } from "../../api";
import { useUserId } from "../../context/UserProvider";

const API_BASE = "https://web-production-ca42.up.railway.app";

const generateAINotificationAI = async (forecast) => {
  try {
    const systemPrompt = `
You are a financial assistant. Based on the forecast data provided, generate a short and clear financial notification in plain English.

- Use Egyptian Pounds (EGP) when referring to money.
- Avoid emojis or special symbols.
- Keep it concise (2-3 sentences maximum).
- Mention if the income is sufficient and one practical financial tip.

ONLY respond in English.

Here is the data:
`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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",
        "HTTP-Referer": "https://takalefy-v2-0.pages.dev",
        "X-Title": "Takalefy",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: JSON.stringify(forecast, null, 2),
          },
        ],
      }),
    });

    if (!res.ok) throw new Error(`OpenRouter API error: ${res.status}`);

    const data = await res.json();

    return data.choices?.[0]?.message?.content || "No smart notification available.";
  } catch (err) {
    console.error("Error in AI Notification:", err);
    return "Error occurred while generating AI notification.";
  }
};

const NotificationsPage = () => {
  const { userId } = useUserId();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateNotifications = async () => {
      if (!userId) {
        setLoading(false);
        setNotifications(["You must be logged in first."]);
        return;
      }

      try {
        setLoading(true);

        const rawTx = await fetchData(`/transactions?userId=${userId}`);
        const filtered = rawTx.filter(
          (tx) =>
            (tx.type === "income" || tx.type === "expense") &&
            tx.user_id === userId
        );

        const grouped = filtered.reduce((acc, tx) => {
          const day = tx.occurred_at.slice(0, 10);
          if (!acc[day]) acc[day] = { date: day, income: 0, expense: 0 };
          const amt = parseFloat(tx.amount);
          if (tx.type === "income") acc[day].income += amt;
          else acc[day].expense += amt;
          return acc;
        }, {});

        const expenseData = Object.values(grouped).map(({ date, expense }) => ({
          date,
          value: expense,
          type: "expense",
        }));

        const incomePerMonthMap = Object.values(grouped).reduce((acc, { date, income }) => {
          if (income > 0) {
            const d = new Date(date);
            const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            if (!acc[monthKey]) acc[monthKey] = 0;
            acc[monthKey] += income;
          }
          return acc;
        }, {});

        const incomeData = Object.entries(incomePerMonthMap).map(([month, totalIncome]) => ({
          date: `${month}-01`,
          value: totalIncome,
          type: "income",
        }));

        const userData = expenseData.concat(incomeData).sort((a, b) => a.date.localeCompare(b.date));

        const res = await fetch(`${API_BASE}/predict-forecast`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_data: userData }),
        });

        if (!res.ok) throw new Error(`Forecast API error: ${res.status}`);

        const forecast = await res.json();

        const msg = await generateAINotificationAI(forecast);

        setNotifications([msg]);
      } catch (err) {
        console.error(err);
        setNotifications(["Error occurred while fetching recommendations."]);
      } finally {
        setLoading(false);
      }
    };

    generateNotifications();
  }, [userId]);

  return (
    <div className="notifications-page p-6 max-w-xl">
      <h2 className="text-2xl font-bold mb-6">Smart Notifications</h2>

      {loading ? (
        <p>Loading notifications...</p>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {notifications.map((msg, i) => (
            <div
              key={i}
              className="bg-white border-l-4 border-blue-500 shadow-md rounded-lg p-4 flex items-start space-x-3"
            >
              <div className="text-blue-500 text-2xl">💡</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Recommendation</h4>
                <p className="text-gray-700">{msg}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;

