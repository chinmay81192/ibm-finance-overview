import React, { useEffect, useMemo, useState } from "react";
import { Endpoints, IncomeStatementObject, ResponseObject } from "../../types";
import { fetchData } from "../../utils";
import PricesTable from "../../components/PricesTable";
import "./styles.scss";
import TimePeriod, { Period } from "../../components/TimePeriod";

type Response = ResponseObject<IncomeStatementObject>;
const IncomeStatement: React.FC = () => {
  const [incomeData, setIncomeData] = useState<Partial<Response>>({});
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("annual");

  useEffect(() => {
    const fetchIncomeData = async () => {
      const resp = await fetchData<Response>(Endpoints.IncomeStatement);
      setIncomeData(resp);
    };

    fetchIncomeData();
  }, []);

  const income = useMemo(() => {
    if (selectedPeriod === "annual") return incomeData?.annualReports ?? [];
    else return incomeData?.quarterlyReports ?? [];
  }, [incomeData, selectedPeriod]);

  return (
    <div className="IncomeStatementContainer">
      <TimePeriod
        handleClick={(period) => setSelectedPeriod(period)}
        selectedTimePeriod={selectedPeriod}
      />
      <PricesTable
        data={income}
        fieldsToHide={["fiscalDateEnding", "reportedCurrency"]}
      />
    </div>
  );
};

export default IncomeStatement;
