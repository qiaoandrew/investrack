import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { country } = req.query;

  try {
    const { data } = await axios.get(`${FINANCE_API_BASE_URL}/market-summary`, {
      params: { country },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
