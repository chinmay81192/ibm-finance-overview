import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Endpoints, TimeSeries, TimeSeriesData } from "../../types";
import { fetchData, formatChartResponse } from "../../utils";
import { useD3Chart } from "../../hooks/useD3Chart";
import "./styles.scss";
import TimePeriod from "../../components/TimePeriod";

const Chart: React.FC = () => {
  const [chartData, setChartData] = useState<Partial<TimeSeries>>({});

  const filterInMonths = ["1 Month", "3 Months", "ALL"];
  const [selectedPeriod, setSelectedPeriod] = useState("ALL");

  useEffect(() => {
    const fetchChartData = async () => {
      const resp = await fetchData(Endpoints.Chart, formatChartResponse);
      setChartData(resp);
    };
    fetchChartData();
  }, []);

  const calculateChartData = useCallback(
    (data: TimeSeriesData, start: Date, end: Date) => {
      const resp: TimeSeriesData = {};
      const timeKeys = Object.keys(data).filter((key) => {
        const date = new Date(key);
        return date >= start && date <= end;
      });
      timeKeys?.forEach((key) => (resp[key] = data[key]));
      return resp;
    },
    []
  );

  const getChartData = useCallback(
    (data: TimeSeriesData, selectedPeriod: string) => {
      if (selectedPeriod === "1 Month") {
        return calculateChartData(
          data,
          new Date(2023, 8, 17),
          new Date(2023, 9, 17)
        );
      } else if (selectedPeriod === "3 Months") {
        return calculateChartData(
          data,
          new Date(2023, 6, 17),
          new Date(2023, 9, 17)
        );
      } else {
        return calculateChartData(
          data,
          new Date(2023, 4, 17),
          new Date(2023, 9, 17)
        );
      }
    },
    [calculateChartData]
  );

  const chartValues = useMemo(() => {
    if (chartData?.TimeSeriesData) {
      return getChartData(
        chartData.TimeSeriesData as TimeSeriesData,
        selectedPeriod
      );
    }
  }, [chartData.TimeSeriesData, selectedPeriod, getChartData]);

  useD3Chart(chartValues ?? {});

  return (
    <>
      {!chartData.TimeSeriesData ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="FilterContainer">
            <TimePeriod
              timePeriods={filterInMonths}
              selectedTimePeriod={selectedPeriod}
              handleClick={(period) => setSelectedPeriod(period)}
            />
          </div>
          <div id="chart"></div>
        </>
      )}
    </>
  );
};

export default Chart;
