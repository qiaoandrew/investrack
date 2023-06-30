import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  try {
    const { data } = await axios.get(`${FINANCE_API_BASE_URL}/search`, {
      params: { query },
    });
    res.status(200).json(
      data.slice(0, 16).map((stock: any) => ({
        symbol: stock.symbol,
        name: stock.shortname,
        exchange: stock.exchDisp,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
