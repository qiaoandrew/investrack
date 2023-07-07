import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { PROFILE_FIELDS } from '@/constants/stock';
import { getTableFields } from '@/util/helpers';

const FINANCE_API_BASE_URL = process.env.FINANCE_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;
  try {
    const { data } = await axios.get(`${FINANCE_API_BASE_URL}/profile`, {
      params: { symbol },
    });
    res.status(200).json({
      profile: getTableFields(PROFILE_FIELDS, data),
      description: data.longBusinessSummary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stock profile.' });
  }
}
