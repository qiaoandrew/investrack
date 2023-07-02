import User from '@/models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongoose';
import { Watchlist } from '@/interfaces/interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid, watchlistId, symbol } = req.query;

  if (req.method === 'DELETE') {
    await connectDB();
    const user = await User.findOne({ uid }).populate('watchlists');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const watchlist = user.watchlists.find(
      (watchlist: Watchlist) => watchlist._id.toString() === watchlistId
    );
    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found.' });
    }
    watchlist.stocks = watchlist.stocks.filter(
      (stock: string) => stock !== symbol
    );
    const savedWatchlist = await watchlist.save();
    res.status(200).json(savedWatchlist);
  }
}
