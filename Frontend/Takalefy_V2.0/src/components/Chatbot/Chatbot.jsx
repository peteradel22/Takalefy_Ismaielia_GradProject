import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { fetchData } from "../../api"; 
import { useUserId } from "../../context/UserProvider";

const Chatbot = () => {
  const { userId } = useUserId();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");

  const toggleChat = () => {
    setIsOpen((prev) => !prev);

    if (!isOpen && !language) {
      setMessages([
        {
          from: "bot",
          text: "Please select your language / من فضلك اختر لغتك: [English] or [العربية]",
        },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setMessages([
      {
        from: "bot",
        text:
          lang === "ar"
            ? "مرحبًا! أنا مساعد تكالفي المالي الشخصي. كيف يمكنني مساعدتك اليوم؟"
            : "Hello! I’m the Takalefy personal finance assistant. How can I help you today?",
      },
    ]);
  };

  const fetchUserTransactions = async () => {
    try {
      const allTx = await fetchData("/transactions", { method: "GET" });
      const filtered = (allTx || []).filter(
        (tx) => String(tx.user_id) === String(userId)
      );
      console.log("🔍 معاملات المستخدم:", filtered);
      return filtered;
    } catch (error) {
      console.error("خطأ أثناء جلب معاملات المستخدم:", error);
      return [];
    }
  };

  const fetchUserGoals = async () => {
    try {
      const allGoals = await fetchData("/user-goals", { method: "GET" });
      const filteredGoals = (allGoals || []).filter(
        (goal) => String(goal.user_id) === String(userId)
      );
      console.log("🎯 أهداف المستخدم:", filteredGoals);
      return filteredGoals;
    } catch (error) {
      console.error("خطأ أثناء جلب أهداف المستخدم:", error);
      return [];
    }
  };

  const isGreeting = (text) => {
    const t = text.toLowerCase();
    const greetingsAr = ["ازيك", "كيف حالك", "يا اهلا", "اهلا", "مرحبا"];
    const greetingsEn = ["hello", "hi", "hey", "how are you"];
    return greetingsAr.some((g) => t.includes(g)) || greetingsEn.some((g) => t.includes(g));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    if (isGreeting(input)) {
      const reply =
        language === "ar"
          ? "الحمد لله، كيف أقدر أساعدك في أمورك المالية اليوم؟"
          : "I’m doing well, thanks! How can I assist you with your finances today?";
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
      setIsTyping(false);
      return;
    }

    try {
      if (!userId || !token) {
        const noAuthReply =
          language === "ar"
            ? "عفوًا، لم يتم تسجيل الدخول أو لم يتم توفير بيانات المستخدم."
            : "Sorry, you are not logged in or user data is missing.";
        setMessages((prev) => [...prev, { from: "bot", text: noAuthReply }]);
        setIsTyping(false);
        return;
      }

      
      const userTransactions = await fetchUserTransactions();

      
      const userGoals = await fetchUserGoals();

      if (userTransactions.length === 0 && userGoals.length === 0) {
        const noDataReply =
          language === "ar"
            ? "لا توجد معاملات أو أهداف مسجلة لك حتى الآن."
            : "I don't have any recorded transactions or goals for you yet.";
        setMessages((prev) => [...prev, { from: "bot", text: noDataReply }]);
        setIsTyping(false);
        return;
      }

    
      const recentTx = userTransactions.slice(-20);
      const summaryLines = recentTx.map((tx) => {
        const dateStr = new Date(tx.occurred_at).toLocaleDateString("en-GB");
        return `نوع: ${tx.type || "غير معروف"}, فئة: ${tx.category || "عام"}, مبلغ: ${tx.amount} جنيه, تاريخ: ${dateStr}`;
      });
      const transactionsSummary = summaryLines.join("\n");

      
      const goalsSummary = userGoals.map((goal) => {
        const deadlineStr = goal.deadline
          ? new Date(goal.deadline).toLocaleDateString("en-GB")
          : "غير محدد";
        return `هدف: ${goal.title || "غير معروف"}, المبلغ المطلوب: ${goal.amount || "غير محدد"} جنيه, الموعد النهائي: ${deadlineStr}`;
      }).join("\n");

     
      const systemPrompt =
        language === "ar"
          ? `أنت مساعد مالي شخصي لتطبيق تكالفي. استخدم البيانات التالية للإجابة على أسئلة المستخدم بدقة وإيجاز (الدخل، المصروفات، الميزانية، التوفير، الأهداف، ونصائح إدارة المال):
${transactionsSummary}

أهداف المستخدم:
${goalsSummary}

إذا كان السؤال خارج هذه المواضيع، أجب: "أنا متخصص فقط في التمويل الشخصي أو التحيات العامة."`
          : `You are the Takalefy personal finance assistant. Use the following transaction data to answer user questions accurately and briefly (income, expenses, budgeting, saving, goals, and money management tips):
${transactionsSummary}

User Goals:
${goalsSummary}

If the question is outside these topics, respond: "I can only assist with personal finance or general greetings."`;

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1:free",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: input },
            ],
          }),
        }
      );

      const data = await response.json();
      const botText =
        data?.choices?.[0]?.message?.content ||
        (language === "ar" ? "عذرًا، حدث خطأ ما." : "Sorry, something went wrong.");

      setMessages((prev) => [...prev, { from: "bot", text: botText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            language === "ar"
              ? "عذرًا، حدث خطأ أثناء الاتصال بالخادم."
              : "Sorry, there was an error connecting to the server.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-50 sm:bottom-6 sm:right-6"
        aria-label="Toggle Chatbot"
      >
        <FaRobot size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 w-11/12 max-w-xs sm:w-80 sm:bottom-20 sm:right-6 bg-white shadow-lg rounded-lg p-4 border z-50 flex flex-col">
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <h2 className="text-lg font-semibold text-blue-600">Chatbot 🤖</h2>
            <button onClick={toggleChat} aria-label="Close Chatbot">
              <FaTimes />
            </button>
          </div>

          <div className="text-sm text-gray-700 space-y-3 h-48 overflow-y-auto flex-grow">
            {messages.map((msg, idx) => (
              <p
                key={idx}
                className={
                  msg.from === "bot"
                    ? "text-left break-words"
                    : "text-right font-semibold text-blue-700 break-words"
                }
              >
                {msg.text}
              </p>
            ))}
            {isTyping && <p className="text-left italic text-gray-500">Typing...</p>}
            <div ref={messagesEndRef} />
          </div>

          {!language ? (
            <div className="flex justify-between mt-3 gap-2">
              <button
                onClick={() => handleLanguageSelect("en")}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex-1"
              >
                English
              </button>
              <button
                onClick={() => handleLanguageSelect("ar")}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm flex-1"
              >
                العربية
              </button>
            </div>
          ) : (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder={language === "ar" ? "اكتب رسالتك هنا..." : "Type your message..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className="flex-grow border rounded px-2 py-1"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-1 rounded"
                disabled={isTyping}
              >
                {language === "ar" ? "إرسال" : "Send"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
