import { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '@/lib/mongoose';
import User from '@/models/User';
import Watchlist from '@/models/Watchlist';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query;

  if (req.method === 'POST') {
    const { name } = req.body;
    try {
      await connectDB();
      const user = await User.findOne({ uid });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      const watchlist = new Watchlist({ name, uid });
      const savedWatchlist = await watchlist.save();
      user.watchlists.push(savedWatchlist._id);
      await user.save();
      res.status(201).json(watchlist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else if (req.method === 'GET') {
    try {
      await connectDB();
      const user = await User.findOne({ uid }).populate('watchlists');
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(user.watchlists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else if (req.method === 'PUT') {
    const { watchlistIds, symbol } = req.body;
    try {
      await connectDB();
      const watchlists = await Watchlist.find({ _id: { $in: watchlistIds } });
      const savedWatchlists = (
        await Promise.all(
          watchlists.map(async (watchlist) => {
            if (!watchlist.stocks.includes(symbol)) {
              watchlist.stocks.push(symbol);
              const savedWatchlist = await watchlist.save();
              return savedWatchlist;
            }
          })
        )
      ).filter(Boolean);
      res.status(200).json(savedWatchlists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
}
