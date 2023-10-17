import { useEffect } from "react";
import { TimeSeriesData, TimeSeriesPoint } from "../types";
import {
  NumberValue,
  axisBottom,
  axisLeft,
  extent,
  line,
  max,
  min,
  scaleLinear,
  scaleTime,
  select,
  timeFormat,
  timeMonth,
  timeParse,
} from "d3";
import {
  HEIGHT,
  MARGINBOTTOM,
  MARGINLEFT,
  MARGINRIGHT,
  MARGINTOP,
  WIDTH,
} from "../constants";

export const useD3Chart = (data: TimeSeriesData) => {
  useEffect(() => {
    const parseDate = timeParse("%Y-%m-%d");
    const graphData: { date: Date; values: TimeSeriesPoint }[] = Object.keys(
      data
    ).map((key) => ({
      date: parseDate(key) as Date,
      values: {
        close: +data[key].close,
        high: +data[key].high,
        low: +data[key].low,
        open: +data[key].open,
        volume: +data[key].volume,
      },
    }));

    if (graphData?.length > 1) {
      const margin = {
        top: MARGINTOP,
        bottom: MARGINBOTTOM,
        left: MARGINLEFT,
        right: MARGINRIGHT,
      };

      const width = WIDTH - margin.left - margin.right;
      const height = HEIGHT - margin.top - margin.bottom;

      const xScale = scaleTime([0, width]);
      const yScale = scaleLinear([height, 0]);

      select("svg").remove();

      const svg = select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      xScale.domain(extent(graphData, (data) => data.date) as [Date, Date]);

      yScale.domain([
        min(graphData, ({ values }) => values.close) as number,
        max(graphData, ({ values }) => values.close) as number,
      ]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(
          axisBottom(xScale)
            .ticks(timeMonth.every(1))
            .tickFormat(
              timeFormat("%b %Y") as (
                domainValue: Date | NumberValue,
                index: number
              ) => string
            )
        );

      svg.append("g").call(axisLeft(yScale));

      const lineChart = line()
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]));

      svg
        .append("path")
        .datum(
          graphData?.map((graph) => [
            graph.date,
            graph.values.close,
          ]) as Iterable<[number, number]>
        )
        .attr("fill", "none")
        .attr("stroke", "#398bff")
        .attr("stroke-width", 1)
        .attr("d", lineChart);
    }
  }, [data]);
};
