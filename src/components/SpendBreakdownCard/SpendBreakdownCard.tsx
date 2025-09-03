import "./spendbreakdowncard.css";
import { formatMoney } from "../../utils";
import ProgressBar from "../ProgressBar/ProgressBar";

type SpendBreakdownCardProps = {
  totalAmount: number;
  dailyNeedsAmount: number;
  numDailyNeedsItems: number;
  monthlyAmount: number;
  numMonthlyItems: number;
  yearlyAmount: number;
  numYearlyItems: number;
};

function formatNumItems(numItems: number): string {
  if (numItems == 1) {
    return `${numItems} item`;
  }
  return `${numItems} items`;
}

function SpendBreakdownCard({
  totalAmount,
  dailyNeedsAmount,
  numDailyNeedsItems,
  monthlyAmount,
  numMonthlyItems,
  yearlyAmount,
  numYearlyItems,
}: SpendBreakdownCardProps) {
  return (
    <div className="spend-breakdown card">
      <h2 className="title">Spending Breakdown</h2>
      <div className="spend-breakdown-container">
        <div className="cost-container cost-container-margin">
          <p>Daily Needs</p>
          <div className="spend-breakdown-stack">
            <p className="spend-breakdown-items">
              {formatNumItems(numDailyNeedsItems)}
            </p>
            <p className="spend-breakdown-amount">
              {formatMoney(dailyNeedsAmount)}/month
            </p>
          </div>
        </div>
        <ProgressBar percentage={(dailyNeedsAmount / totalAmount) * 100} />
      </div>
      <div className="spend-breakdown-container">
        <div className="cost-container cost-container-margin">
          <p>Montly</p>
          <div className="spend-breakdown-stack">
            <p className="spend-breakdown-items">
              {formatNumItems(numMonthlyItems)}
            </p>
            <p className="spend-breakdown-amount">
              {formatMoney(monthlyAmount)}/month
            </p>
          </div>
        </div>
        <ProgressBar percentage={(monthlyAmount / totalAmount) * 100} />
      </div>

      <div className="spend-breakdown-container">
        <div className="cost-container cost-container-margin">
          <p>Yearly</p>
          <div className="spend-breakdown-stack">
            <p className="spend-breakdown-items">
              {formatNumItems(numYearlyItems)}
            </p>
            <p className="spend-breakdown-amount">
              {formatMoney(yearlyAmount)}/month
            </p>
          </div>
        </div>
        <ProgressBar percentage={(yearlyAmount / totalAmount) * 100} />
      </div>
    </div>
  );
}

export default SpendBreakdownCard;
