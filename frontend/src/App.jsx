import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import OtpGate from "./components/OtpGate";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckIn from "./pages/CheckIn";
import Dashboard from "./pages/Dashboard";
import StudentProfile from "./pages/StudentProfile";
import Observe from "./pages/Observe";
import AdminPanel from "./pages/AdminPanel";
import BuddyTasks from "./pages/BuddyTasks";

function ProtectedObserve() {
  return (
    <OtpGate>
      <Observe />
    </OtpGate>
  );
}

function ProtectedDashboard() {
  return (
    <OtpGate>
      <Dashboard />
    </OtpGate>
  );
}

function ProtectedStudentProfile() {
  return (
    <OtpGate>
      <StudentProfile />
    </OtpGate>
  );
}

function AppRoutes() {
  const { user, loading, logout } = useAuth();
  const [authView, setAuthView] = useState("landing");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    if (authView === "register") {
      return <Register onSwitch={() => setAuthView("login")} />;
    }
    if (authView === "login") {
      return <Login onSwitch={() => setAuthView("register")} />;
    }
    return (
      <LandingPage
        onLogin={() => setAuthView("login")}
      />
    );
  }

  const role = user.role;
  const homeRoute = role === "admin" ? "/admin" : "/checkin";

  function handleSwitchAccount() {
    logout();
    setAuthView("landing");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              role={role}
              userName={user.full_name}
              userEmail={user.email}
              onSignOut={logout}
              onSwitchAccount={handleSwitchAccount}
            />
          }
        >
          <Route index element={<Navigate to={homeRoute} replace />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/observe" element={<ProtectedObserve />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
          <Route path="/students/:id" element={<ProtectedStudentProfile />} />
          <Route path="/buddy-tasks" element={<BuddyTasks />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to={homeRoute} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
