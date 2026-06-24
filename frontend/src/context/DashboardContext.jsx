import { createContext, useContext, useEffect, useState } from "react";

const DashboardContext = createContext(null);

const STORAGE_KEY = "lunapay:app:v2";

const DEFAULT_DATA = {
  settings: {
    currency: "Ft",
    monthlyIncome: 0,
    avgMonthlyExpenses: 0,
  },
  plans: [
    {
      id: "plan-1",
      name: "",
      goal: {
        category: "",
        targetAmount: 0,
        targetDate: "",
        startDate: "",
      },
    },
  ],
  activePlanId: "plan-1",
};

function safeParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}

function normalizeDateString(value) {
  if (typeof value !== "string") return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return "";
}

function normalizeLoadedData(raw) {
  if (!raw || typeof raw !== "object") return DEFAULT_DATA;

  const settingsRaw = raw.settings || raw.user || {};
  const settings = {
    currency:
      typeof settingsRaw.currency === "string" ? settingsRaw.currency : "Ft",
    monthlyIncome: Number(settingsRaw.monthlyIncome || 0),
    avgMonthlyExpenses: Number(settingsRaw.avgMonthlyExpenses || 0),
  };

  const plansRaw = Array.isArray(raw.plans) ? raw.plans : DEFAULT_DATA.plans;

  const plans = plansRaw.map((p, index) => {
    const goal = p.goal || {};
    return {
      id: typeof p.id === "string" ? p.id : `plan-${index + 1}`,
      name: typeof p.name === "string" ? p.name : "",
      goal: {
        category: typeof goal.category === "string" ? goal.category : "",
        targetAmount: Number(goal.targetAmount || 0),
        targetDate: normalizeDateString(goal.targetDate),
        startDate: normalizeDateString(goal.startDate),
      },
    };
  });

  const activePlanIdRaw =
    typeof raw.activePlanId === "string" ? raw.activePlanId : plans[0].id;

  const activeExists = plans.some((p) => p.id === activePlanIdRaw);
  const activePlanId = activeExists ? activePlanIdRaw : plans[0].id;

  return { settings, plans, activePlanId };
}

export function DashboardDataProvider({ children }) {
  const [dashboardData, setDashboardData] = useState(DEFAULT_DATA);

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const raw = safeParse(stored);
    const normalized = normalizeLoadedData(raw);

    setDashboardData(normalized);
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    const minimal = {
      settings: dashboardData.settings,
      activePlanId: dashboardData.activePlanId,
      plans: dashboardData.plans,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal));
  }, [dashboardData, hasLoaded]);

  const activePlan =
    dashboardData.plans.find((p) => p.id === dashboardData.activePlanId) ||
    dashboardData.plans[0];

  const isSetupComplete = Boolean(
    dashboardData.settings.currency &&
    Number(dashboardData.settings.monthlyIncome) > 0 &&
    Number(dashboardData.settings.avgMonthlyExpenses) >= 0
  );

  const hasGoalConfigured = Boolean(
    activePlan?.goal?.category &&
    Number(activePlan?.goal?.targetAmount) > 0 &&
    activePlan?.goal?.targetDate
  );

  function updateSettings(nextSettingsData) {
    setDashboardData((prev) => {
      return {
        ...prev,
        settings: {
          ...prev.settings,
          ...nextSettingsData,
        },
      };
    });
  }

  function updateActivePlan(nextPlanData) {
    setDashboardData((prev) => {
      const updatedPlans = prev.plans.map((plan) => {
        if (plan.id !== prev.activePlanId) return plan;

        return {
          ...plan,
          ...nextPlanData,
          goal: {
            ...plan.goal,
            ...(nextPlanData.goal || {}),
          },
        };
      });

      return {
        ...prev,
        plans: updatedPlans,
      };
    });
  }

  function resetActiveGoal() {
    updateActivePlan({
      name: "",
      goal: {
        category: "",
        targetAmount: 0,
        targetDate: "",
        startDate: "",
      },
    });
  }

  const value = {
    dashboardData,
    activePlan,
    updateSettings,
    updateActivePlan,
    hasLoaded,
    isSetupComplete,
    hasGoalConfigured,
    resetActiveGoal,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardData() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error(
      "useDashboardData must be used within DashboardDataProvider"
    );
  }
  return ctx;
}
