import React, { useEffect, useMemo, useState } from "react";
import PricesTable from "../../components/PricesTable";
import { BalanceSheetObject, Endpoints, ResponseObject } from "../../types";
import { fetchData } from "../../utils";
import TimePeriod, { Period } from "../../components/TimePeriod";

type Response = ResponseObject<BalanceSheetObject>;

const BalanceSheet: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("annual");
  const [balanceSheetData, setBalanceSheetData] = useState<Partial<Response>>(
    {}
  );

  useEffect(() => {
    const fetchBalanceSheetData = async () => {
      const resp = await fetchData<Response>(Endpoints.BalanceSheet);
      setBalanceSheetData(resp);
    };

    fetchBalanceSheetData();
  }, []);

  const balanceSheet = useMemo(() => {
    if (selectedPeriod === "annual")
      return balanceSheetData?.annualReports ?? [];
    else return balanceSheetData?.quarterlyReports ?? [];
  }, [balanceSheetData, selectedPeriod]);

  return (
    <div className="IncomeStatementContainer">
      <TimePeriod
        handleClick={(period) => setSelectedPeriod(period)}
        selectedTimePeriod={selectedPeriod}
      />
      <PricesTable
        data={balanceSheet}
        fieldsToHide={["fiscalDateEnding", "reportedCurrency"]}
      />
    </div>
  );
};

export default BalanceSheet;
