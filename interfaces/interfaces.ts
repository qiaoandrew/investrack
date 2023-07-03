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

export interface NewsArticle {
  id: number;
  headline: string;
  summary?: string;
  url: string;
  image: string;
}

export interface StockQuote {
  symbol: string;
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

export interface TableItem {
  label: string;
  value: string;
}

export interface PriceHistory {
  time: string;
  value: number;
}

export interface Purchase {
  _id: string;
  purchaseDate: string;
  purchasePrice: number;
  quantity: number;
}

export interface Portfolio {
  _id: string;
  uid: string;
  name: string;
  holdings: Record<string, Purchase[]>;
}

export interface Watchlist {
  _id: string;
  uid: string;
  name: string;
  stocks: string[];
}

export interface DateType {
  month: string;
  day: string;
  year: string;
}
