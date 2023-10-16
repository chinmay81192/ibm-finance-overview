import { useEffect } from "react";
import { TimeSeriesData } from "../types";
import d3, {
  axisBottom,
  axisLeft,
  curveCardinal,
  extent,
  line,
  max,
  min,
  scaleLinear,
  scaleTime,
  select,
} from "d3";

export const useD3Chart = (svgRef: any, data: TimeSeriesData) => {
  useEffect(() => {
    console.log("DATA");
    console.log(data);
    const svg = select(svgRef.current);
    const dates = Object.keys(data);
    const closeMin = min(dates, (d) => parseFloat(data[d].close)) ?? 0;
    const closeMax = max(dates, (d) => parseFloat(data[d].close)) ?? 0;
    const xScale = scaleTime()
      .domain(Object.keys(data).map((d) => new Date(d)))
      .range([0, 300]);

    const yScale = scaleLinear()
      .domain([closeMin - 1, closeMax + 2])
      .range([700, 0]);

    const xAxis = axisBottom(xScale).ticks(dates.length);
    //@ts-ignore
    svg.select(".x-axis").style("transform", "translateY(100px)").call(xAxis);

    const yAxis = axisLeft(yScale);
    //@ts-ignore
    svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis);
    const myLine = line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d[0]))
      .curve(curveCardinal);
  }, [data]);
};
