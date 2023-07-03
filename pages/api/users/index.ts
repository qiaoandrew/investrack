import { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '@/lib/mongoose';
import User from '@/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { uid, email } = req.body;

    try {
      await connectDB();
      const savedUser = await User.findOne({ uid });
      if (savedUser) {
        return res.status(200).json(savedUser);
      }
      const newUser = new User({ uid, email, watchlists: [], portfolios: [] });
      const savedNewUser = await newUser.save();
      return res.status(200).json(savedNewUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
}
