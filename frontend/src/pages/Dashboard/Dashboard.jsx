import BudgetCard from "../../components/Dashboard/BudgetCard.jsx";
import GoalCard from "../../components/Dashboard/GoalCard.jsx";
import NextStepsCard from "../../components/Dashboard/NextStepsCard.jsx";
import GoalProgressCard from "../../components/Dashboard/GoalProgressCard.jsx";
import { useDashboardData } from "../../context/DashboardContext.jsx";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  const {
    dashboardData,
    activePlan,
    hasGoalConfigured,
    updateActivePlan,
    resetActiveGoal,
  } = useDashboardData();

  if (!activePlan) {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
        </header>

        <main className="dashboard-grid">
          <section className="card">
            <h2>Loading…</h2>
          </section>
        </main>
      </div>
    );
  }

  const income = Number(dashboardData.settings.monthlyIncome ?? 0);
  const expenses = Number(dashboardData.settings.avgMonthlyExpenses ?? 0);
  const baselineSavings = income - expenses;
  const currency = dashboardData.settings.currency ?? "Ft";

  const planName = activePlan.name ?? "";
  const category = activePlan.goal?.category ?? "";
  const targetAmount = Number(activePlan.goal?.targetAmount ?? 0);
  const targetDate = activePlan.goal?.targetDate ?? "";
  const startDate = activePlan.goal?.startDate ?? "";

  function monthIndex(date) {
    return date.getFullYear() * 12 + date.getMonth();
  }

  function parseDate(dateString) {
    if (!dateString) return null;

    const d = new Date(dateString);

    if (Number.isNaN(d.getTime())) return null;

    return d;
  }

  function roundTo(value, step) {
    if (step <= 0) return value;

    return Math.round(value / step) * step;
  }

  function createTodayString() {
    const now = new Date();

    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");
  }

  const today = new Date();
  const deadline = parseDate(targetDate);
  const start = parseDate(startDate);

  let monthsTotal = 0;
  let monthsElapsed = 0;

  if (start && deadline) {
    monthsTotal = monthIndex(deadline) - monthIndex(start);

    if (monthsTotal < 0) {
      monthsTotal = 0;
    }

    if (monthsTotal === 0 && monthIndex(deadline) >= monthIndex(start)) {
      monthsTotal = 1;
    }

    monthsElapsed = monthIndex(today) - monthIndex(start);

    if (monthsElapsed < 0) {
      monthsElapsed = 0;
    }

    if (monthsElapsed > monthsTotal) {
      monthsElapsed = monthsTotal;
    }
  }

  let monthsLeft = 0;

  if (deadline) {
    const diff = monthIndex(deadline) - monthIndex(today);

    monthsLeft = diff < 0 ? 0 : diff;
  }

  let requiredPerMonth = 0;

  if (targetAmount > 0 && monthsTotal > 0) {
    requiredPerMonth = roundTo(targetAmount / monthsTotal, 1000);
  }

  const expectedSoFar =
    requiredPerMonth > 0 && monthsElapsed > 0
      ? requiredPerMonth * monthsElapsed
      : 0;

  const savedSoFar = baselineSavings * monthsElapsed;

  const isFeasible =
    requiredPerMonth > 0 ? baselineSavings >= requiredPerMonth : true;

  const timelineVerdict =
    expectedSoFar > 0
      ? savedSoFar >= expectedSoFar
        ? "onTrack"
        : "behind"
      : "notStarted";

  const isDeadlinePassed =
    Boolean(deadline) &&
    monthsLeft === 0 &&
    monthIndex(deadline) < monthIndex(today);

  let statusText = "In progress";
  let statusTone = "";

  if (hasGoalConfigured && isDeadlinePassed) {
    if (savedSoFar >= targetAmount) {
      statusText = "Success";
      statusTone = "positive";
    } else {
      statusText = "Failed";
      statusTone = "negative";
    }
  }

  const monthsText = monthsLeft > 0 ? `~${monthsLeft} months` : "—";

  function handleEditPlan() {
    if (!activePlan.goal?.startDate) {
      updateActivePlan({
        goal: {
          startDate: createTodayString(),
        },
      });
    }

    navigate("/plans/new");
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>

      <main className="dashboard-grid">
        {hasGoalConfigured ? (
          <GoalProgressCard
            planName={planName}
            category={category}
            savedSoFar={savedSoFar}
            targetAmount={targetAmount}
            monthsText={monthsText}
            currency={currency}
            requiredPerMonth={requiredPerMonth}
            baselineSavings={baselineSavings}
            statusText={statusText}
            statusTone={statusTone}
            buttonText="Edit plan"
            expectedSoFar={expectedSoFar}
            isFeasible={isFeasible}
            timelineVerdict={timelineVerdict}
            onStartPlan={handleEditPlan}
          />
        ) : (
          <section className="card goal-progress">
            <h2>No active goal yet</h2>

            <p style={{ opacity: 0.8, maxWidth: 720 }}>
              Create your first savings goal and LunaPay will calculate your
              timeline automatically.
            </p>

            <button type="button" onClick={() => navigate("/plans/new")}>
              Create New Plan
            </button>
          </section>
        )}

        <BudgetCard
          incomeAmount={income}
          expensesAmount={expenses}
          savingsAmount={baselineSavings}
          currency={currency}
        />

        {hasGoalConfigured && (
          <GoalCard
            category={category}
            targetAmount={targetAmount}
            months={monthsLeft}
            currency={currency}
          />
        )}

        <NextStepsCard />

        {hasGoalConfigured && (
          <section className="card">
            <h2>Plan actions</h2>

            <button type="button" onClick={resetActiveGoal}>
              Reset goal
            </button>
          </section>
        )}
      </main>
    </div>
  );
}