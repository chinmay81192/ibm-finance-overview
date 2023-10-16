import { string } from "yargs";

export enum TabElements {
  chart = "chart",
  incomeStatement = "incomeStatement",
  balanceSheet = "balanceSheet",
}

export enum Endpoints {
  Chart = "TIME_SERIES_DAILY",
  IncomeStatement = "INCOME_STATEMENT",
  BalanceSheet = "BALANCE_SHEET",
}

export interface TimeSeriesData {
  [key: string]: {
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  };
}

export interface TimeSeries {
  MetaData: {
    Information: string;
    Symbol: string;
    LastRefreshed: string;
    OutputSize: string;
    TimeZone: string;
  };
  TimeSeriesData: TimeSeriesData;
}

export interface ResponseObject<T> {
  abc: string;
  annualReports: T[];
  quarterlyReports: T[];
}

export interface IncomeStatementObject {
  fiscalDateEnding: string;
  reportedCurrency: string;
  grossProfit: string;
  totalRevenue: string;
  costOfRevenue: string;
  costofGoodsAndServicesSold: string;
  operatingIncome: string;
  sellingGeneralAndAdministrative: string;
  researchAndDevelopment: string;
  operatingExpenses: string;
  investmentIncomeNet: string;
  netInterestIncome: string;
  interestIncome: string;
  interestExpense: string;
  nonInterestIncome: string;
  otherNonOperatingIncome: string;
  depreciation: string;
  depreciationAndAmortization: string;
  incomeBeforeTax: string;
  incomeTaxExpense: string;
  interestAndDebtExpense: string;
  netIncomeFromContinuingOperations: string;
  comprehensiveIncomeNetOfTax: string;
  ebit: string;
  ebitda: string;
  netIncome: string;
}

export interface BalanceSheetObject {
  fiscalDateEnding: string;
  reportedCurrency: string;
  totalAssets: string;
  totalCurrentAssets: string;
  cashAndCashEquivalentsAtCarryingValue: string;
  cashAndShortTermInvestments: string;
  inventory: string;
  currentNetReceivables: string;
  totalNonCurrentAssets: string;
  propertyPlantEquipment: string;
  accumulatedDepreciationAmortizationPPE: string;
  intangibleAssets: string;
  intangibleAssetsExcludingGoodwill: string;
  goodwill: string;
  investments: string;
  longTermInvestments: string;
  shortTermInvestments: string;
  otherCurrentAssets: string;
  otherNonCurrentAssets: string;
  totalLiabilities: string;
  totalCurrentLiabilities: string;
  currentAccountsPayable: string;
  deferredRevenue: string;
  currentDebt: string;
  shortTermDebt: string;
  totalNonCurrentLiabilities: string;
  capitalLeaseObligations: string;
  longTermDebt: string;
  currentLongTermDebt: string;
  longTermDebtNoncurrent: string;
  shortLongTermDebtTotal: string;
  otherCurrentLiabilities: string;
  otherNonCurrentLiabilities: string;
  totalShareholderEquity: string;
  treasuryStock: string;
  retainedEarnings: string;
  commonStock: string;
  commonStockSharesOutstanding: string;
}

export interface QueryResponse {
  [key: string]: {
    [key: string]: any;
  };
}
