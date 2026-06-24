import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import EmailLogin from "./pages/Login/EmailLogin.jsx";
import DashboardPage from "./pages/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import SetupPage from "./pages/Setup/Setup.jsx";
import NewPlanPage from "./pages/Plans/NewPlanPage.jsx";
import Header from "./components/Header/Header.jsx";
import {
  DashboardDataProvider,
  useDashboardData,
} from "./context/DashboardContext.jsx";

function SetupGate({ children }) {
  const { hasLoaded, isSetupComplete } = useDashboardData();

  if (!hasLoaded) {
    return null;
  }

  if (!isSetupComplete) {
    return <Navigate to="/setup" replace />;
  }

  return children;
}

function AppLayout({ children }) {
  return (
    <>
      <Header title="LunaPay" />
      {children}
    </>
  );
}

export default function App() {
  return (
    <DashboardDataProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/login/email" element={<EmailLogin />} />

        <Route
          path="/plans/new"
          element={
            <ProtectedRoute>
              <AppLayout>
                <NewPlanPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SetupGate>
                  <AppLayout>
                    <DashboardPage />
                  </AppLayout>
              </SetupGate>
            </ProtectedRoute>
          }
        />

        <Route
          path="/setup"
          element={
            <ProtectedRoute>
              <AppLayout>
                <SetupPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardDataProvider>
  );
}
