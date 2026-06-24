export function calcSavings(incomeAmount, expensesAmount) {
  return Number(incomeAmount || 0) - Number(expensesAmount || 0);
}

export function calcMonthsToGoal(targetAmount, monthlySavings) {
  const target = Number(targetAmount || 0);
  const savings = Number(monthlySavings || 0);

  if (target <= 0) return null;
  if (savings <= 0) return null;

  return Math.ceil(target / savings);
}

export function formatFt(amount) {
  const n = Number(amount || 0);
  return n.toLocaleString("hu-HU");
}

export function getRecommendations({
  isSetupComplete,
  hasGoalConfigured,
  monthlySavings,
  requiredPerMonth,
  isFeasible,
}) {
  if (!isSetupComplete) {
    return ["Complete your first budget setup."];
  }

  if (monthlySavings <= 0) {
    return ["Your expenses are higher than or equal to your income."];
  }

  if (!hasGoalConfigured) {
    return ["Create your first savings goal."];
  }

  if (!isFeasible) {
    return ["Increase monthly savings or extend your target date."];
  }

  if (requiredPerMonth > 0) {
    const difference = Math.abs(monthlySavings - requiredPerMonth);
    const tolerance = requiredPerMonth * 0.1;

    if (difference <= tolerance) {
      return ["You are close to your target pace."];
    }
  }

  return ["Your goal looks achievable."];
}