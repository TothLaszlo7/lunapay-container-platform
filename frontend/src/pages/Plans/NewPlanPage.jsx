import { useEffect, useState } from "react";
import { useDashboardData } from "../../context/DashboardContext.jsx";
import { useNavigate } from "react-router-dom";

export default function NewPlanPage() {
  const navigate = useNavigate();

  const { activePlan, dashboardData, updateActivePlan } = useDashboardData();

  const currency = dashboardData.settings.currency ?? "Ft";

  const [planName, setPlanName] = useState("");
  const [category, setCategory] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => {
    if (!activePlan) return;

    setPlanName(activePlan.name ?? "");
    setCategory(activePlan.goal?.category ?? "");
    setTargetAmount(activePlan.goal?.targetAmount ?? 0);
    setTargetDate(activePlan.goal?.targetDate ?? "");
  }, [activePlan]);

  function handleSave() {
    updateActivePlan({
      name: planName,
      goal: {
        category,
        targetAmount,
        targetDate,
      },
    });

    navigate("/dashboard");
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>New Plan</h1>
      </header>

      <main className="dashboard-grid">
        <section className="card">
          <h2>Goal setup</h2>
          <p style={{ opacity: 0.75, marginTop: 0 }}>
            Define what you are saving for. LunaPay will use this goal to
            calculate your monthly target and timeline.
          </p>

          <div className="control">
            <div className="control-label">Plan name</div>

            <input
              className="input-dark"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="e.g. Summer holiday"
            />
          </div>

          <div className="control">
            <div className="control-label">Category</div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category...</option>

              <option value="Holiday">Holiday</option>

              <option value="Emergency fund">Emergency fund</option>

              <option value="Car">Car</option>

              <option value="Home">Home</option>

              <option value="Education">Education</option>

              <option value="Other">Other</option>
            </select>
          </div>

          <div className="control">
            <div className="control-label">Target date</div>

            <input
              className="input-dark"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>

          <div className="control">
            <div className="control-label">Target amount</div>

            <div className="control-row">
              <input
                type="range"
                min="0"
                max="10000000"
                step="50000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
              />

              <input
                className="input-dark"
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="row" style={{ marginTop: 12 }}>
            <span>Target amount</span>

            <strong>
              {targetAmount} {currency}
            </strong>
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <button type="button" onClick={handleSave}>
              Save Plan
            </button>

            <button type="button" onClick={() => navigate("/dashboard")}>
              Cancel
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
