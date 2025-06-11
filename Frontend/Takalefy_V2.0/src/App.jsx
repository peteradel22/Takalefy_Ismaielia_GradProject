import { Routes, Route } from "react-router-dom";
import DashboardProvider from "./components/dashboard-main/DashboardContext";
import UserProvider from "./context/UserProvider"; // ده مهم

import Wallet from "./pages/home/Wallet";
import Dashboard from "./pages/home/Dashboard";
import AddTransaction from "./pages/home/Transaction-bar";
import FileManager from "./pages/home/Manager-File";
import Goal from "./pages/home/Goal";
import Insights from "./pages/home/Insights";
import Transactions from "./pages/home/Transactions";
import Setting from "./pages/home/Settings";
import ContactForm from "./pages/home/ContactUs";
import NotificationsPage from "./pages/home/NotificationsPage";
import HelpCenter from "./pages/home/helpcenter";
import AddTransactionnB from "./pages/home/AddTransactionnB";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EmailVerificationForm from "./pages/auth/emailVerification.jsx";
import EmailOTPVerification from "./pages/auth/emailOTPVerification.jsx";
import PhoneVerificationForm from "./pages/auth/phoneVerification.jsx";
import PhoneOTPVerification from "./pages/auth/phoneOTPVerification.jsx";

import IncomeUI from './pages/on-boarding/income.jsx';
import WelcomeUI from './pages/on-boarding/welcome.jsx';
import GoalsUI from './pages/on-boarding/goals.jsx';

import SidebarLayout from "./layouts/SidebarLayout";

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/email-verification" element={<EmailVerificationForm />} />
      <Route path="/email-otp-verification" element={<EmailOTPVerification />} />
      <Route path="/phone-verification" element={<PhoneVerificationForm />} />
      <Route path="/phone-otp-verification" element={<PhoneOTPVerification />} />

      <Route element={<SidebarLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/new-transaction" element={<AddTransaction />} />
        <Route path="/file-manager" element={<FileManager />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/add" element={<AddTransactionnB />} />
      </Route>

      <Route path="/income" element={<IncomeUI />} />
      <Route path="/welcome" element={<WelcomeUI />} />
      <Route path="/goals" element={<GoalsUI />} />
    </Routes>
  );
}

function App() {
  return (
    <DashboardProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </DashboardProvider>
  );
}

export default App;