import { useEffect, useState } from "react";
import { useDashboardData } from "../../context/DashboardContext.jsx";
import { useNavigate } from "react-router-dom";

export default function SetupPage() {
  const navigate = useNavigate();
  const { dashboardData, updateSettings } = useDashboardData();

  const [incomeDraft, setIncomeDraft] = useState(
    dashboardData.settings.monthlyIncome
  );

  const [expensesDraft, setExpensesDraft] = useState(
    dashboardData.settings.avgMonthlyExpenses
  );

  useEffect(() => {
    setIncomeDraft(dashboardData.settings.monthlyIncome ?? 0);
    setExpensesDraft(dashboardData.settings.avgMonthlyExpenses ?? 0);
  }, [dashboardData.settings]);

  function updateIncome(nextIncome) {
    setIncomeDraft(nextIncome);
    updateSettings({ monthlyIncome: nextIncome });
  }

  function updateExpenses(nextExpenses) {
    setExpensesDraft(nextExpenses);
    updateSettings({ avgMonthlyExpenses: nextExpenses });
  }

  function handleContinue() {
    navigate("/dashboard");
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Basic Setup</h1>
      </header>

      <main className="dashboard-grid">
        <section className="card">
          <h2>Monthly budget</h2>

          <div className="control">
            <div className="control-label">Income</div>

            <div className="control-row">
              <input
                type="range"
                min="0"
                max="2000000"
                step="5000"
                value={incomeDraft}
                onChange={(e) => updateIncome(Number(e.target.value))}
              />

              <input
                className="input-dark"
                type="number"
                min="0"
                max="2000000"
                step="5000"
                value={incomeDraft}
                onChange={(e) => updateIncome(Number(e.target.value))}
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="control">
            <div className="control-label">Fixed monthly expenses</div>

            <div className="control-row">
              <input
                type="range"
                min="0"
                max="2000000"
                step="5000"
                value={expensesDraft}
                onChange={(e) => updateExpenses(Number(e.target.value))}
              />

              <input
                className="input-dark"
                type="number"
                min="0"
                max="2000000"
                step="5000"
                value={expensesDraft}
                onChange={(e) => updateExpenses(Number(e.target.value))}
                inputMode="numeric"
              />
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <button type="button" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
