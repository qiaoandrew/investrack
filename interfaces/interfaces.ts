export interface SearchResult {
  symbol: string;
  name: string;
  exchange: 'NASDAQ' | 'NYSE';
}

export interface NewsArticle {
  id: number;
  headline: string;
  summary: string;
  url: string;
  image: string;
}

export interface MarketSummary {
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface TrendingStock {
  symbol: string;
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

export interface Holding {
  _id: string;
  stock: string;
  purchaseDate: Date;
  purchasePrice: number;
  quantity: number;
}

export interface Portfolio {
  _id: string;
  uid: string;
  name: string;
  holdings: Holding[];
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
