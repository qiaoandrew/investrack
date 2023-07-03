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
    await connectDB();
    const { name } = req.body;
    const portfolio = await Portfolio.findByIdAndUpdate(
      portfolioId,
      { name },
      { new: true }
    );
    res.status(200).json(portfolio);
  } else if (req.method === 'DELETE') {
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
  } else if (req.method === 'POST') {
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
  } else {
    await connectDB();
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found.' });
    }
    for (let symbol of portfolio.holdings.keys()) {
      let purchases = portfolio.holdings.get(symbol);
      purchases = await Promise.all(
        purchases.map((id: any) => Purchase.findById(id))
      );
      portfolio.holdings.set(symbol, purchases);
    }
    res.status(200).json(portfolio);
  }
}
