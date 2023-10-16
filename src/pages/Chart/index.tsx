import React, { useEffect, useRef, useState } from "react";
import { Endpoints, TimeSeries } from "../../types";
import { fetchData, formatChartResponse } from "../../utils";
import { useD3Chart } from "../../hooks/useD3Chart";

const Chart: React.FC = () => {
  const [chartData, setChartData] = useState<Partial<TimeSeries>>({});
  const svgRef = useRef(null);

  useEffect(() => {
    console.log("Page loaded");

    const fetchChartData = async () => {
      const resp = await fetchData(Endpoints.Chart, formatChartResponse);
      setChartData(resp);
    };
    fetchChartData();
  }, []);

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  useD3Chart(svgRef, chartData?.TimeSeriesData ?? {});

  return <svg ref={svgRef}></svg>;
};

export default Chart;
