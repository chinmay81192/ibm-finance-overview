import React from "react";
import "./styles.scss";

export type Period = "annual" | "quaterly";

interface TimePeriodProps {
  handleClick: (period: Period) => void;
  selectedTimePeriod: Period;
}

const TimePeriod: React.FC<TimePeriodProps> = ({
  handleClick,
  selectedTimePeriod,
}: TimePeriodProps) => {
  return (
    <p className="TimePeriodContainer">
      <span
        className={`styleSpan ${
          selectedTimePeriod === "annual" ? "SelectedTimePeriod" : ""
        }`}
        onClick={() => handleClick("annual")}
      >
        Annual
      </span>
      <hr style={{ height: "20px" }} />
      <span
        className={`styleSpan ${
          selectedTimePeriod === "quaterly" ? "SelectedTimePeriod" : ""
        }`}
        onClick={() => handleClick("quaterly")}
      >
        Quaterly
      </span>
    </p>
  );
};

export default TimePeriod;
