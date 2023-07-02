import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query;
  console.log(type);

  try {
    const { data } = await axios.get(`${FINANCE_API_BASE_URL}/screener`, {
      params: { type },
    });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
