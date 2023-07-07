import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { TrendingStock } from '@/types/types';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await axios.get(
      `${FINANCE_API_BASE_URL}/trending?country=united states`
    );
    const trendingStocks = data.map((stock: any) => ({
      symbol: stock.symbol,
      price: Math.round(stock.regularMarketPrice * 100) / 100,
      change: Math.round(stock.regularMarketChange * 100) / 100,
      changePercent: Math.round(stock.regularMarketChangePercent * 10000) / 100,
    }));
    res.status(200).json(trendingStocks as TrendingStock[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching trending.', error });
  }
}
