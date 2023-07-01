import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { StockPrice } from '@/interfaces/interfaces';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;

  try {
    const { data } = await axios.get(`${FINANCE_API_BASE_URL}/price`, {
      params: { symbol },
    });
    res.status(200).json(data as StockPrice[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
