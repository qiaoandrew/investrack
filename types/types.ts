export type SearchResult = {
  symbol: string;
  name: string;
  exchange: 'NASDAQ' | 'NYSE';
};
export type TrendingStock = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
};
export type MarketSummary = {
  name: string;
  price: number;
  change: number;
  changePercent: number;
};
export type StockPrice = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  exchange: 'NASDAQ' | 'NYSE';
};
export type NewsArticle = {
  id: number;
  title: string;
  description?: string;
  url: string;
  image: string;
};
export type PriceHistory = {
  time: string;
  value: number;
};

export type Watchlist = {
  _id: string;
  uid: string;
  name: string;
  stocks: string[];
};
export type Portfolio = {
  _id: string;
  uid: string;
  name: string;
  holdings: string[];
};
export type Holdings = {
  value: number;
  return: number;
  returnPercent: number;
  holdings: StockHolding[];
};
export type StockHolding = {
  symbol: string;
  name: string;
  value: number;
  quantity: number;
  return: number;
  returnPercent: number;
  transactions: StockTransaction[];
};
export type StockTransaction = {
  purchaseId: string;
  purchaseDate: string;
  value: number;
  quantity: number;
  return: number;
  returnPercent: number;
};
export type StockPurchase = {
  _id: string;
  purchaseDate: string;
  purchasePrice: number;
  quantity: number;
};

export type MonthDayYear = {
  month: string;
  day: string;
  year: string;
};
export type TableItem = {
  label: string;
  value: string;
};
export type TableField = {
  key: string;
  type: string;
};
