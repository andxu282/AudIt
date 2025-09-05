import "./progressbar.css";

type ProgressBarProps = {
  percentage: number;
};

function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="progress-bar">
      <div className="progress-bar-background" />
      <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
    </div>
  );
}

export default ProgressBar;
