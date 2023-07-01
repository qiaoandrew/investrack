import { NextApiRequest, NextApiResponse } from 'next';
import Watchlist from '@/models/Watchlist';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { watchlistId } = req.query;

  if (req.method === 'PATCH') {
    const { name } = req.body;
    const watchlist = await Watchlist.findByIdAndUpdate(
      watchlistId,
      { name },
      { new: true }
    );
    res.status(200).json(watchlist);
  }
}
