export interface DateType {
  month: string;
  day: string;
  year: string;
}

export interface SearchResult {
  symbol: string;
  name: string;
  exchange: 'NASDAQ' | 'NYSE';
}

export interface TrendingStock {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface MarketSummary {
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface StockPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  exchange: 'NASDAQ' | 'NYSE';
}

export interface NewsArticle {
  id: number;
  title: string;
  description?: string;
  url: string;
  image: string;
}

export interface TableItem {
  label: string;
  value: string;
}

export interface PriceHistory {
  time: string;
  value: number;
}

export interface Watchlist {
  _id: string;
  uid: string;
  name: string;
  stocks: string[];
}
export interface Portfolio {
  _id: string;
  uid: string;
  name: string;
  holdings: string[];
}

export interface PortfolioHoldings {
  value: number;
  return: number;
  returnPercent: number;
  holdings: PortfolioHolding[];
}

export interface PortfolioHolding {
  symbol: string;
  name: string;
  value: number;
  quantity: number;
  return: number;
  returnPercent: number;
  purchases: {
    purchaseId: string;
    purchaseDate: string;
    value: number;
    quantity: number;
    return: number;
    returnPercent: number;
  }[];
}
