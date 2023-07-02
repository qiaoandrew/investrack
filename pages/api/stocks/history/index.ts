import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { PriceHistory } from '@/interfaces/interfaces';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol, period, interval } = req.query;

  try {
    const { data } = await axios.get(
      `${FINANCE_API_BASE_URL}/history?symbol=${symbol}&period=${period}&interval=${interval}`
    );
    const priceHistory = data.map((item: any) => ({
      time:
        (new Date(item.Date || item.Datetime).getTime() - 4 * 60 * 60 * 1000) /
        1000,
      value: item.Close,
    }));
    res.status(200).json(priceHistory as PriceHistory[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
