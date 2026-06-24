export default function GoalProgressCard({
  planName,
  category,
  savedSoFar,
  targetAmount,
  monthsText,
  currency,
  requiredPerMonth,
  baselineSavings,
  statusText,
  statusTone,
  buttonText,
  onStartPlan,
  expectedSoFar,
  isFeasible,
  timelineVerdict,
}) {
  const safeCurrency = currency || "Ft";
  const safeButtonText = buttonText || "Start plan";

  const progressPct =
    expectedSoFar > 0
      ? Math.min(
          100,
          Math.max(0, Math.round((savedSoFar / expectedSoFar) * 100))
        )
      : targetAmount > 0
        ? Math.min(
            100,
            Math.max(0, Math.round((savedSoFar / targetAmount) * 100))
          )
        : 0;

  return (
    <section className="card goal-progress">
      <div className="goal-progress-top">
        <div>
          <h2 className="goal-progress-title">Goal progress</h2>
          <div className="goal-progress-sub">
            {planName || "Plan"} • {category || "—"}
          </div>
        </div>

        <div className="goal-progress-amounts">
          <div className="goal-progress-main">
            {Number(savedSoFar || 0).toLocaleString("hu-HU")}{" "}
            {safeCurrency}{" "}
          </div>
          <div className="goal-progress-target">
            of {targetAmount.toLocaleString("hu-HU")} {safeCurrency}
          </div>

          <div className="goal-progress-verdict">
            {!isFeasible
              ? "Not feasible"
              : timelineVerdict === "behind"
                ? "Behind schedule"
                : timelineVerdict === "onTrack"
                  ? "On track"
                  : "Tracking started"}
          </div>
        </div>
      </div>

      <div className="goal-progress-bar">
        <div className="goal-progress-track">
          <div
            className="goal-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="goal-progress-meta">
          {progressPct}% - {expectedSoFar > 0 ? "timeline" : "target"}
        </div>
      </div>

      <div className="goal-progress-stats">
        <div>
          <div className="muted">Required / month</div>
          <div className={`kpi-value ${!isFeasible ? "value-negative" : ""}`}>
            {requiredPerMonth.toLocaleString("hu-HU")} {safeCurrency}
          </div>
        </div>

        <div>
          <div className="muted">Your capacity</div>
          <div className="kpi-value">
            {baselineSavings.toLocaleString("hu-HU")} {safeCurrency}
          </div>
        </div>

        <div>
          <div className="muted">Time left</div>
          <div className="kpi-value">
            {!isFeasible ? "Not achievable" : monthsText}
          </div>{" "}
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <button type="button" onClick={onStartPlan}>
          {safeButtonText}
        </button>
      </div>
    </section>
  );
}
