import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongoose';
import Watchlist from '@/models/Watchlist';
import User from '@/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { watchlistId, uid } = req.query;

  if (req.method === 'PATCH') {
    await connectDB();
    const { name } = req.body;
    const watchlist = await Watchlist.findByIdAndUpdate(
      watchlistId,
      { name },
      { new: true }
    );
    res.status(200).json(watchlist);
  } else if (req.method === 'DELETE') {
    await connectDB();
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    user.watchlists = user.watchlists.filter(
      (watchlist: string) => watchlist.toString() !== watchlistId
    );

    await user.save();
    await Watchlist.findByIdAndDelete(watchlistId);
    res.status(200).json({ message: 'Watchlist deleted successfully.' });
  }
}
