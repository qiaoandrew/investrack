import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '@/lib/mongoose';
import Purchase from '@/models/Purchase';
import Portfolio from '@/models/Portfolio';
import { Holdings, StockPrice } from '@/types/types';

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { portfolioId } = req.query;

  if (req.method === 'GET') {
    try {
      await connectDB();
      const portfolio = await fetchPortfolio(portfolioId as string);
      if (!portfolio) {
        return res.status(404).json({ message: 'Portfolio not found.' });
      }
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
        const purchases = await fetchPurchases(purchasesArray);
        portfolio.holdings.set(symbol, purchases);
      }
      const priceMap = await fetchPrices(Array.from(portfolio.holdings.keys()));
      let totalValue = 0;
      let totalSpent = 0;
      const holdingsList = Array.from(portfolio.holdings.keys()).map(
        (symbol) => {
          const purchases = portfolio.holdings.get(symbol);
          const holding = createHolding(symbol as string, priceMap, purchases);
          totalValue += holding.value;
          totalSpent += holding.totalSpent;
          return holding;
        }
      );
      const holdings: Holdings = {
        value: Math.round(totalValue * 100) / 100,
        return: Math.round((totalValue - totalSpent) * 100) / 100,
        returnPercent:
          Math.round(((totalValue - totalSpent) / totalSpent) * 10000) / 100,
        holdings: holdingsList,
      };
      res.status(200).json(holdings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching portfolio.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}

const fetchPrices = async (symbols: string[]) => {
  const { data: prices } = await axios.get(
    `${FRONTEND_BASE_URL}/api/stocks/price?symbols=${Array.from(symbols).join(
      ','
    )}`
  );
  return prices.reduce((map: Record<string, StockPrice>, price: StockPrice) => {
    map[price.symbol] = price;
    return map;
  }, {});
};

const fetchPortfolio = async (portfolioId: string) => {
  await connectDB();
  return Portfolio.findById(portfolioId);
};

const fetchPurchases = async (purchasesArray: string[]) => {
  return await Promise.all(
    purchasesArray.map((purchase: string) => Purchase.findById(purchase))
  );
};

const computePurchase = (purchase: any, symbolPrice: number) => {
  const value = purchase.quantity * symbolPrice;
  const spent = purchase.quantity * purchase.purchasePrice;
  return {
    purchaseId: purchase._id,
    purchaseDate: purchase.purchaseDate,
    value: Math.round(value * 100) / 100,
    quantity: purchase.quantity,
    return: Math.round((value - spent) * 100) / 100,
    returnPercent: Math.round(((value - spent) / spent) * 10000) / 100,
  };
};

const createHolding = (
  symbol: string,
  priceMap: Record<string, StockPrice>,
  purchases: any[]
) => {
  let valueInSymbol = 0;
  let totalSpentOnSymbol = 0;
  let totalSymbolQuantity = 0;

  const transactions = purchases.map((purchase) => {
    const computedPurchase = computePurchase(purchase, priceMap[symbol].price);
    valueInSymbol += computedPurchase.value;
    totalSpentOnSymbol += computedPurchase.quantity * purchase.purchasePrice;
    totalSymbolQuantity += computedPurchase.quantity;
    return computedPurchase;
  });

  transactions.sort((a, b) => b.purchaseDate - a.purchaseDate);

  return {
    symbol,
    name: priceMap[symbol].name,
    value: valueInSymbol,
    quantity: totalSymbolQuantity,
    return: valueInSymbol - totalSpentOnSymbol,
    returnPercent:
      ((valueInSymbol - totalSpentOnSymbol) / totalSpentOnSymbol) * 100,
    transactions,
    totalSpent: totalSpentOnSymbol,
  };
};
