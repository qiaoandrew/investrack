import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { openModal } from '@/store/slices/modalSlice';
import { Portfolio, StockPrice } from '@/interfaces/interfaces';
import { formatDate, formatNumber } from '@/util/helpers';
import AnimateHeight from 'react-animate-height';
import IconButton from '@/components/UI/IconButton';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { ChevronDown, ChevronUp, Edit, Trash } from 'react-feather';
import { COLORS } from '@/constants/colors';

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [stockPrices, setStockPrices] = useState<Record<string, StockPrice>>();
  const [heights, setHeights] = useState<(0 | 'auto')[]>([]);

  const router = useRouter();
  const { portfolioId } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!user) return;
      try {
        const { data } = await axios.get(
          `/api/users/${user.uid}/portfolios/${portfolioId}`
        );
        setPortfolio(data as Portfolio);
        setHeights(new Array(Object.keys(data.holdings).length).fill(0));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPortfolio();
  }, [user, portfolioId]);

  useEffect(() => {
    const fetchStockPrices = async () => {
      if (!portfolio) return;
      try {
        const { data } = await axios.get(
          `/api/stocks/price?symbols=${Object.keys(portfolio.holdings).join(
            ','
          )}`
        );
        const stockPrices: Record<string, StockPrice> = {};
        for (const stockPrice of data as StockPrice[]) {
          stockPrices[stockPrice.symbol] = stockPrice;
        }
        setStockPrices(stockPrices);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStockPrices();
  }, [portfolio]);

  if (!portfolio || !stockPrices) return <LoadingSpinner />;

  const toggleHeight = (i: number) => {
    const newHeights = [...heights];
    newHeights[i] = newHeights[i] === 0 ? 'auto' : 0;
    setHeights(newHeights);
  };

  const holdings = Object.entries(portfolio.holdings).map(
    ([symbol, purchases]) => {
      const stockPrice = stockPrices[symbol];
      const totalValue = purchases.reduce(
        (total, purchase) => total + stockPrice.price * purchase.quantity,
        0
      );
      const totalSpent = purchases.reduce(
        (total, purchase) => total + purchase.purchasePrice * purchase.quantity,
        0
      );
      const totalReturn = Math.round((totalValue - totalSpent) * 100) / 100;
      const totalReturnPercent =
        Math.round((totalReturn / totalSpent) * 10000) / 100;
      const totalShares = purchases.reduce(
        (total, purchase) => total + purchase.quantity,
        0
      );
      const symbolPurchases = purchases.map((purchase) => ({
        ...purchase,
        totalValue: stockPrice.price * purchase.quantity,
        totalReturn:
          Math.round(
            (stockPrice.price * purchase.quantity -
              purchase.purchasePrice * purchase.quantity) *
              100
          ) / 100,
        totalReturnPercent:
          Math.round(
            ((stockPrice.price * purchase.quantity -
              purchase.purchasePrice * purchase.quantity) /
              (purchase.purchasePrice * purchase.quantity)) *
              10000
          ) / 100,
      }));

      return {
        symbol,
        name: stockPrice.name,
        totalValue,
        totalReturn,
        totalReturnPercent,
        totalShares,
        symbolPurchases,
      };
    }
  );

  const totalValue = holdings.reduce(
    (total, holding) => total + holding.totalValue,
    0
  );
  const totalReturn = holdings.reduce(
    (total, holding) => total + holding.totalReturn,
    0
  );
  const totalReturnPercent =
    Math.round((totalReturn / (totalValue - totalReturn)) * 10000) / 100;

  return (
    <div className='mx-dashboard max-w-[566px]'>
      <div className='mb-2 flex items-center justify-between'>
        <h1 className='text-3xl font-semibold text-white 2xl:text-4xl'>
          {portfolio.name}
        </h1>
        <div className='flex gap-4'>
          <IconButton
            icon={<Edit size={16} color={COLORS.grey1} />}
            onClick={() => dispatch(openModal('renamePortfolio'))}
          />
          <IconButton
            icon={<Trash size={16} color={COLORS.grey1} />}
            onClick={() => dispatch(openModal('deletePortfolio'))}
          />
        </div>
      </div>
      <p className='mb-4 text-8xl font-semibold text-white'>
        ${formatNumber(totalValue)}
      </p>
      <div className='mb-12 flex items-center gap-2'>
        <ChevronUp size={24} color={COLORS.green} />
        <p className='text-lg xl:text-xl'>
          <span className='text-green'>
            {formatNumber(totalReturn)} ({totalReturnPercent}%)
          </span>{' '}
          <span className='text-white'>All Time</span>
        </p>
      </div>
      <div className='mb-4 grid grid-cols-[minmax(0,3fr)_minmax(0,3fr)_minmax(0,3fr)_minmax(0,1fr)] gap-x-6 text-right text-sm text-grey1 md:mb-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)] md:text-md'>
        <div />
        <p>Total Value</p>
        <p>Total Return</p>
      </div>
      {holdings.map((holding, i) => (
        <Fragment key={holding.symbol}>
          <div className='mb-7 grid grid-cols-[minmax(0,3fr)_minmax(0,3fr)_minmax(0,3fr)_minmax(0,1fr)]  items-center gap-x-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)]'>
            <div>
              <p className='mb-1 font-semibold text-white'>{holding.symbol}</p>
              <p className='text-sm text-blue1 md:text-md'>{holding.name}</p>
            </div>
            <div className='text-right'>
              <p className='mb-1 text-white'>{holding.totalValue}</p>
              <p className='text-sm text-blue1 md:text-md'>
                {holding.totalShares} shares
              </p>
            </div>
            <div
              className={`text-right ${
                holding.totalReturn >= 0 ? 'text-green' : 'text-red'
              }`}
            >
              <div className='mb-1 inline-flex items-center gap-3'>
                <ChevronUp
                  size={20}
                  color={holding.totalReturn >= 0 ? COLORS.green : COLORS.red}
                  className={`${holding.totalReturn >= 0 ? '' : 'rotate-180'}`}
                />
                <p>{holding.totalReturn}</p>
              </div>
              <p className='text-sm md:text-md'>
                {holding.totalReturnPercent}%
              </p>
            </div>
            <div
              onClick={() => toggleHeight(i)}
              className='transition-300 cursor-pointer justify-self-end rounded-full border border-transparent p-1.5 hover:border-grey2 hover:bg-grey3 hover:bg-opacity-60'
            >
              <ChevronDown
                size={24}
                color={COLORS.grey1}
                className={`transition-300 ${
                  heights[i] === 'auto' ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>
          {holding.symbolPurchases.map((purchase, j) => (
            <AnimateHeight
              duration={300}
              height={heights[i]}
              key={`transaction-${j}`}
            >
              <div className='mb-7 grid grid-cols-[minmax(0,3fr)_minmax(0,3fr)_minmax(0,3fr)_minmax(0,1fr)] items-center gap-x-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)]'>
                <div className='self-start'>
                  <p className='font-medium text-white'>
                    {formatDate(purchase.purchaseDate)}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='mb-1 text-white'>{purchase.totalValue}</p>
                  <p className='text-sm text-blue1 md:text-md'>
                    {purchase.quantity} shares
                  </p>
                </div>
                <div
                  className={`text-right ${
                    purchase.totalReturn >= 0 ? 'text-green' : 'text-red'
                  }`}
                >
                  <div className='mb-1 inline-flex items-center gap-3'>
                    <ChevronUp
                      size={20}
                      color={
                        purchase.totalReturn >= 0 ? COLORS.green : COLORS.red
                      }
                      className={`${
                        purchase.totalReturn >= 0 ? '' : 'rotate-180'
                      }`}
                    />
                    <p>{purchase.totalReturn}</p>
                  </div>
                  <p className='text-sm md:text-md'>
                    {purchase.totalReturnPercent}%
                  </p>
                </div>
                <IconButton
                  icon={<Edit size={16} color={COLORS.grey1} />}
                  onClick={() => {}}
                  classes='justify-self-end'
                />
              </div>
            </AnimateHeight>
          ))}
          {i !== holdings.length - 1 && (
            <hr className='border-b-1 mb-6 border-grey2' />
          )}
        </Fragment>
      ))}
    </div>
  );
}
