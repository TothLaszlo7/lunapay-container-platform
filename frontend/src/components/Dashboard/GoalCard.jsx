export default function GoalCard({ category, targetAmount, months, currency }) {
  const monthsText = months > 0 ? `~${months} months` : "—";

  return (
    <section className="card">
      <h2>Goal</h2>

      <div className="row">
        <span>Category</span>
        <strong>{category || "—"}</strong>
      </div>

      <div className="row">
        <span>Desired amount</span>
        <strong>
          {targetAmount} {currency}
        </strong>
      </div>

      <div className="row">
        <span>Estimated time</span>
        <strong>{monthsText}</strong>
      </div>

    </section>
  );
}