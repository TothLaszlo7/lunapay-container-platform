export default function BudgetCard({ incomeText, expensesText, savingsText }) {
  return (
    <section className="card">
      <h2>Costs</h2>

      <div className="row">
        <span>Average monthly</span>
        <strong>{incomeText}</strong>
      </div>

      <div className="row">
        <span>Monthly expenses</span>
        <strong>{expensesText}</strong>
      </div>

      <div className="row">
        <span>Economy / month</span>
        <strong>{savingsText}</strong>
      </div>
    </section>
  );
}