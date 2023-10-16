import React from "react";
import { Route, Routes } from "react-router-dom";
import Chart from "./pages/Chart";
import BalanceSheet from "./pages/BalanceSheet";
import IncomeStatement from "./pages/IncomeStatement";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Chart />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/balancesheet" element={<BalanceSheet />} />
      <Route path="/incomestatement" element={<IncomeStatement />} />
    </Routes>
  );
};

export default AppRoutes;
