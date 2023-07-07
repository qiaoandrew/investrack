import { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '@/lib/mongoose';
import Portfolio from '@/models/Portfolio';
import User from '@/models/User';
import Purchase from '@/models/Purchase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { portfolioId, uid } = req.query;

  if (req.method === 'PATCH') {
    try {
      await connectDB();
      const { name } = req.body;
      const portfolio = await Portfolio.findByIdAndUpdate(
        portfolioId,
        { name },
        { new: true }
      );
      res.status(200).json(portfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating portfolio name.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await connectDB();
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting portfolio.' });
    }
  } else if (req.method === 'POST') {
    try {
      await connectDB();
      const { purchaseDate, quantity, purchasePrice, symbol } = req.body;
      const purchase = new Purchase({
        purchaseDate: new Date(
          purchaseDate.year,
          purchaseDate.month - 1,
          purchaseDate.day
        ),
        quantity,
        purchasePrice,
      });
      const savedPurchase = await purchase.save();
      const portfolio = await Portfolio.findById(portfolioId);
      if (!portfolio) {
        return res.status(404).json({ message: 'Portfolio not found.' });
      }
      if (portfolio.holdings.has(symbol)) {
        const purchasesArray = portfolio.holdings.get(symbol);
        purchasesArray.push(savedPurchase._id);
        portfolio.holdings.set(symbol, purchasesArray);
      } else {
        portfolio.holdings.set(symbol, [savedPurchase._id]);
      }
      portfolio.markModified('holdings');
      const savedPortfolio = await portfolio.save();
      res.status(200).json(savedPortfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding purchase to portfolio.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
