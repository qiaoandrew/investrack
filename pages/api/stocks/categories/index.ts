import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query;

  try {
    const { data } = await axios.get(`${FINANCE_API_BASE_URL}/screener`, {
      params: { type },
    });
    const stocks = data.map((result: any) => ({
      symbol: result.symbol,
      name: result.shortName,
      price: Math.round(result.regularMarketPrice * 100) / 100,
      change: Math.round(result.regularMarketChange * 100) / 100,
      changePercent: Math.round(result.regularMarketChangePercent * 100) / 100,
    }));
    res.status(200).json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
