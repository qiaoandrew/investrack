import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '@/lib/mongoose';
import Portfolio from '@/models/Portfolio';
import Purchase from '@/models/Purchase';
import {
  PortfolioHolding,
  PortfolioHoldings,
  StockPrice,
} from '@/interfaces/interfaces';

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { portfolioId, uid } = req.query;

  if (req.method === 'GET') {
    await connectDB();
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      portfolioId;
      return res.status(404).json({ message: 'Portfolio not found.' });
    }
    console.log(portfolio.holdings.keys());
    if (Array.from(portfolio.holdings.keys()).length === 0) {
      return res.status(200).json({
        value: 0,
        return: 0,
        returnPercent: 0,
        holdings: [],
      });
    }
    for (let symbol of portfolio.holdings.keys()) {
      const purchasesArray = portfolio.holdings.get(symbol);
      const purchases = await Promise.all(
        purchasesArray.map(async (purchase: string) => {
          const purchaseObj = await Purchase.findById(purchase);
          return purchaseObj;
        })
      );
      portfolio.holdings.set(symbol, purchases);
    }
    const { data: prices } = await axios.get(
      `${FRONTEND_BASE_URL}/api/stocks/price?symbols=${Array.from(
        portfolio.holdings.keys()
      ).join(',')}`
    );
    const priceMap: Record<string, StockPrice> = {};
    for (let price of prices) {
      priceMap[price.symbol] = price;
    }
    const holdings: PortfolioHoldings = {
      value: 0,
      return: 0,
      returnPercent: 0,
      holdings: [],
    };
    let totalValue = 0;
    let totalSpent = 0;
    for (let symbol of portfolio.holdings.keys()) {
      const holding: PortfolioHolding = {
        symbol,
        name: priceMap[symbol].name,
        value: 0,
        quantity: 0,
        return: 0,
        returnPercent: 0,
        purchases: [],
      };
      const purchases = portfolio.holdings.get(symbol);
      let valueInSymbol = 0;
      let totalSpentOnSymbol = 0;
      let totalSymbolQuantity = 0;
      for (let purchase of purchases) {
        const value = purchase.quantity * priceMap[symbol].price;
        const spent = purchase.quantity * purchase.purchasePrice;
        holding.purchases.push({
          purchaseId: purchase._id,
          purchaseDate: purchase.date,
          value: Math.round(value * 100) / 100,
          quantity: purchase.quantity,
          return: Math.round((value - spent) * 100) / 100,
          returnPercent: Math.round(((value - spent) / spent) * 10000) / 100,
        });
        valueInSymbol += value;
        totalSpentOnSymbol += spent;
        totalSymbolQuantity += purchase.quantity;
      }
      holding.value = valueInSymbol;
      holding.quantity = totalSymbolQuantity;
      holding.return = valueInSymbol - totalSpentOnSymbol;
      holding.returnPercent =
        ((valueInSymbol - totalSpentOnSymbol) / totalSpentOnSymbol) * 100;
      holdings.holdings.push(holding);
      totalValue += valueInSymbol;
      totalSpent += totalSpentOnSymbol;
    }
    holdings.value = Math.round(totalValue * 100) / 100;
    holdings.return = Math.round((totalValue - totalSpent) * 100) / 100;
    holdings.returnPercent =
      Math.round(((totalValue - totalSpent) / totalSpent) * 10000) / 100;
    res.status(200).json(holdings);
  }
}
