import React, { Suspense, useMemo, useState } from "react";
import Header from "./components/Header";
import "./Root.scss";
import { TabElements } from "./types";
import AppRoutes from "./AppRoutes";
import { Link } from "react-router-dom";

const INCOME_STATEMENT = TabElements.incomeStatement;
const BALANCE_SHEET = TabElements.balanceSheet;
const CHART = TabElements.chart;

const Root: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabElements>(CHART);
  const tabs = useMemo(() => {
    return {
      [CHART]: {
        key: CHART,
        label: "Chart",
      },
      [INCOME_STATEMENT]: {
        key: INCOME_STATEMENT,
        label: "Income Statement",
      },
      [BALANCE_SHEET]: {
        key: BALANCE_SHEET,
        label: "Balance Sheet",
      },
    };
  }, []);

  const handleTabChange = (key: TabElements) => {
    setSelectedTab(key);
  };
  return (
    <div className="Container">
      <Header
        title={"International Business Machines Corporation (IBM)"}
        subtitle={"NYSE - NYSE Delayed Price. Currency in USD"}
      />
      <div className="TabbedContainer">
        <ul className="Tabs">
          {Object.values(tabs).map((tab) => (
            <li
              value={tab.key}
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={
                "TabElement" +
                (selectedTab === tab.key ? " TabElementSelected" : "")
              }
            >
              <Link
                className={
                  "StyleLink TabElement" +
                  (selectedTab === tab.key ? " TabElementSelected" : "")
                }
                to={"/" + tab.key}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="ContentContainer">
        <Suspense fallback={<h1>Loading...</h1>}>
          <AppRoutes />
        </Suspense>
      </div>
    </div>
  );
};

export default Root;
