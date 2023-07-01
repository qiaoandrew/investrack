import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';
import Portfolio from '@/models/Portfolio';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, uid } = req.body;
    try {
      await connectDB();
      const user = await User.findOne({ uid });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      const portfolio = new Portfolio({ name, uid });
      const savedPortfolio = await portfolio.save();
      user.portfolios.push(savedPortfolio._id);
      await user.save();
      res.status(201).json(portfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else if (req.method === 'GET') {
    const { uid } = req.query;
    try {
      await connectDB();
      const user = await User.findOne({ uid }).populate('portfolios');
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(user.portfolios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
}
