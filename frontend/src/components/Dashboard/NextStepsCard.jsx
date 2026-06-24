import { useDashboardData } from "../../context/DashboardContext.jsx";
import {
  calcSavings,
  getRecommendations,
} from "../../utils/finance.js";

export default function NextStepsCard() {
  const {
    dashboardData,
    activePlan,
    isSetupComplete,
    hasGoalConfigured,
  } = useDashboardData();

  const income = Number(
    dashboardData.settings.monthlyIncome ?? 0
  );

  const expenses = Number(
    dashboardData.settings.avgMonthlyExpenses ?? 0
  );

  const monthlySavings = calcSavings(
    income,
    expenses
  );

  const targetAmount = Number(
    activePlan?.goal?.targetAmount ?? 0
  );

  let requiredPerMonth = 0;

  if (targetAmount > 0) {
    requiredPerMonth = targetAmount / 12;
  }

  const isFeasible =
    monthlySavings >= requiredPerMonth;

  const recommendations =
    getRecommendations({
      isSetupComplete,
      hasGoalConfigured,
      monthlySavings,
      requiredPerMonth,
      isFeasible,
    });

  return (
    <section className="card">
      <h2>Next steps</h2>

      <ul className="list">
        {recommendations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
  