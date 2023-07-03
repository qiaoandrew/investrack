import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { PROFILE_FIELDS } from '@/constants/stock';
import { getTableFields } from '@/util/stocks';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;
  const { data } = await axios.get(`${FINANCE_API_BASE_URL}/profile`, {
    params: { symbol },
  });
  const profile = getTableFields(PROFILE_FIELDS, data);
  const description: string = data.longBusinessSummary;
  res.status(200).json({ profile, description });
}
