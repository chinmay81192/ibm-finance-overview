import React from "react";
import "./styles.scss";

const StockValue: React.FC = () => {
  return (
    <div>
      <p className="MainValueContainer">
        <span className="MainValue">138.46</span>
        <span className="SubValue-negative">-2.78</span>
        <span className="SubValue-negative">(-1.97%)</span>
      </p>
      <span className="SubHeading">At close: October 13 04:00PM EDT</span>
    </div>
  );
};

export default StockValue;
