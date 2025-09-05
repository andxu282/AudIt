import "./monthlyspendcard.css";
import { formatMoney } from "../../utils";

type MonthlySpendCardProps = {
  totalAmount: number;
  subscriptionsAmount: number;
  itemsAmount: number;
  numItems: number;
};

function MonthlySpendCard({
  totalAmount,
  subscriptionsAmount,
  itemsAmount,
  numItems,
}: MonthlySpendCardProps) {
  return (
    <div className="monthly-spend card">
      <h2 className="title">Monthly Cost of Living</h2>
      <h1 className="total-cost">{formatMoney(totalAmount)}</h1>
      <h4 className="subtext">Based on {numItems} tracked items</h4>
      <div className="cost-container cost-container-margin">
        <p className="cost">Subscriptions Cost: </p>
        <p className="amount">{formatMoney(subscriptionsAmount)}</p>
      </div>
      <div className="cost-container cost-container-margin">
        <p className="cost">Items Cost:</p>
        <p className="amount">{formatMoney(itemsAmount)}</p>
      </div>
    </div>
  );
}

export default MonthlySpendCard;
