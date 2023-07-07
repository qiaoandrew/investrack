import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { StockPrice } from '@/types/types';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

const formatStockPrice = (data: any) => ({
  symbol: data.symbol,
  name: data.shortName,
  price: Math.round(data.regularMarketPrice * 100) / 100,
  change: Math.round(data.regularMarketChange * 100) / 100,
  changePercent: Math.round(data.regularMarketChangePercent * 10000) / 100,
  exchange: data.exchange === 'NMS' ? 'NASDAQ' : 'NYSE',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol, symbols } = req.query;

  try {
    const { data } = await axios.get(`${FINANCE_API_BASE_URL}/price`, {
      params: { symbol, symbols },
    });
    if (symbol) {
      res.status(200).json(formatStockPrice(data) as StockPrice);
    } else {
      const formattedPrices = data.map((result: any) =>
        formatStockPrice(result)
      );
      res.status(200).json(formattedPrices as StockPrice[]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stock price.' });
  }
}
