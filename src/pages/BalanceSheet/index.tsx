import React, { useEffect } from "react";

const BalanceSheet: React.FC = () => {
  useEffect(() => {
    console.log("Balance sheet");
  }, []);
  return <>Balance Sheet</>;
};

export default BalanceSheet;
