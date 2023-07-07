import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { getTableFields } from '@/util/helpers';
import { SUMMARY_FIELDS } from '@/constants/stock';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;

  try {
    const { data } = await axios.get(`${FINANCE_API_BASE_URL}/summary`, {
      params: { symbol },
    });
    return res.status(200).json(getTableFields(SUMMARY_FIELDS, data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching summary.' });
  }
}
