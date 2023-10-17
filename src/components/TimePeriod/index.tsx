import React from "react";
import "./styles.scss";

export type Period = "annual" | "quaterly";

interface TimePeriodProps {
  handleClick: (period: string) => void;
  selectedTimePeriod: string;
  timePeriods: string[];
}

const TimePeriod: React.FC<TimePeriodProps> = ({
  handleClick,
  selectedTimePeriod,
  timePeriods,
}: TimePeriodProps) => {
  return (
    <p className="TimePeriodContainer">
      {timePeriods.map((period, idx) => (
        <>
          <span
            key={idx}
            className={`styleSpan ${
              selectedTimePeriod === period ? "SelectedTimePeriod" : ""
            }`}
            onClick={() => {
              handleClick(period);
            }}
            data-testid={`option-${period}`}
          >
            {period}
          </span>
          {idx !== timePeriods.length - 1 && <hr className="StyleDivider" />}
        </>
      ))}
    </p>
  );
};

export default TimePeriod;
