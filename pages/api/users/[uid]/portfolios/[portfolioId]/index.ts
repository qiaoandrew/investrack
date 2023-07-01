import { NextApiRequest, NextApiResponse } from 'next';
import Portfolio from '@/models/Portfolio';
import User from '@/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { portfolioId, uid } = req.query;

  if (req.method === 'PATCH') {
    const { name } = req.body;
    const portfolio = await Portfolio.findByIdAndUpdate(
      portfolioId,
      { name },
      { new: true }
    );
    res.status(200).json(portfolio);
  } else if (req.method === 'DELETE') {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    user.portfolios = user.portfolios.filter(
      (portfolio: string) => portfolio.toString() !== portfolioId
    );
    await user.save();
    await Portfolio.findByIdAndDelete(portfolioId);
    res.status(200).json({ message: 'Portfolio deleted successfully.' });
  }
}
