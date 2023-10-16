import {
  IncomeStatementObject,
  QueryResponse,
  ResponseObject,
  TimeSeries,
} from "./types";

export const fetchData = async <T>(
  endpoint: string,
  formatter?: (resp: unknown) => T
): Promise<T> => {
  const url = `https://www.alphavantage.co/query?function=${endpoint}&symbol=IBM&apikey=demo`;
  const resp = await fetch(url);
  const respToJSON: unknown = await resp.json();
  return formatter?.(respToJSON) ?? (respToJSON as T);
};

export const formatChartResponse = (resp: unknown) => {
  const metadata = (resp as QueryResponse)?.["Meta Data"];
  const timeSeries = (resp as QueryResponse)?.["Time Series (Daily)"];
  const data: TimeSeries = {
    MetaData: {
      Information: metadata?.["1. Information"] as string,
      Symbol: metadata?.["2. Symbol"],
      LastRefreshed: metadata?.["3. Last Refreshed"],
      OutputSize: metadata?.["4. Output Size"],
      TimeZone: metadata?.["5. Time Zone"],
    },
    TimeSeriesData: Object.fromEntries(
      Object.entries(timeSeries).map((key) => [
        key[0],
        {
          open: timeSeries?.[key[0]]?.["1. open"],
          high: timeSeries?.[key[0]]?.["2. high"],
          low: timeSeries?.[key[0]]?.["3. low"],
          close: timeSeries?.[key[0]]?.["4. close"],
          volume: timeSeries?.[key[0]]?.["5. volume"],
        },
      ])
    ),
  };
  return data;
};
