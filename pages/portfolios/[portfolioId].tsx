import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { ChevronDown, ChevronUp, Edit, Trash } from 'react-feather';

import IconButton from '@/components/UI/IconButton';
import LoadingSpinner from '@/components/UI/LoadingSpinner';

import { AppDispatch, RootState } from '@/store/store';
import { openModal } from '@/store/slices/modalSlice';
import {
  Portfolio,
  PortfolioHoldings,
  StockPrice,
} from '@/interfaces/interfaces';
import { formatDate, formatNumber } from '@/util/helpers';
import { COLORS } from '@/constants/colors';

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [portfolioHoldings, setPortfolioHoldings] =
    useState<PortfolioHoldings>();
  const [heights, setHeights] = useState<(0 | 'auto')[]>([]);

  const router = useRouter();
  const { portfolioId } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { portfolios } = useSelector((state: RootState) => state.portfolios);
  const portfolio = portfolios.find(
    (portfolio) => portfolio._id === portfolioId
  );

  useEffect(() => {
    const fetchPortfolioHoldings = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/users/${user.uid}/portfolios/${portfolioId}/holdings`
        );
        setPortfolioHoldings(data as PortfolioHoldings);
        setHeights(new Array(Object.keys(data).length).fill(0));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioHoldings();
  }, [user, portfolioId]);

  if (!portfolio || !portfolioHoldings) return <LoadingSpinner />;

  const toggleHeight = (i: number) => {
    const newHeights = [...heights];
    newHeights[i] = newHeights[i] === 0 ? 'auto' : 0;
    setHeights(newHeights);
  };

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
      {loading ? (
        <LoadingSpinner margin='mt-6' />
      ) : (
        <>
          <p className='mb-4 text-8xl font-semibold text-white'>
            ${formatNumber(portfolioHoldings.value)}
          </p>
          <div className='mb-12 flex items-center gap-2'>
            <ChevronUp size={24} color={COLORS.green} />
            <p className='text-lg xl:text-xl'>
              <span className='text-green'>
                {formatNumber(portfolioHoldings.return)} (
                {portfolioHoldings.returnPercent.toFixed(2)}%)
              </span>{' '}
              <span className='text-white'>All Time</span>
            </p>
          </div>
          <div className='mb-4 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_minmax(0,3fr)_minmax(0,1fr)] gap-x-6 text-right text-sm text-grey1 md:mb-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)] md:text-md'>
            <div />
            <p>Total Value</p>
            <p>Total Return</p>
          </div>
          {portfolioHoldings.holdings.map((holding, i) => (
            <Fragment key={holding.symbol}>
              <div className='mb-7 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_minmax(0,3fr)_minmax(0,1fr)]  items-center gap-x-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)]'>
                <div>
                  <p className='mb-1 font-semibold text-white'>
                    {holding.symbol}
                  </p>
                  <p className='line-clamp-1 text-sm text-blue1 md:text-md'>
                    {holding.name}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='mb-1 text-white'>{holding.value.toFixed(2)}</p>
                  <p className='text-sm text-blue1 md:text-md'>
                    {holding.quantity} shares
                  </p>
                </div>
                <div
                  className={`text-right ${
                    holding.return >= 0 ? 'text-green' : 'text-red'
                  }`}
                >
                  <div className='mb-1 inline-flex w-full max-w-[100px] items-center justify-between gap-3'>
                    <ChevronUp
                      size={20}
                      color={holding.return >= 0 ? COLORS.green : COLORS.red}
                      className={`${holding.return >= 0 ? '' : 'rotate-180'}`}
                    />
                    <p>{holding.return.toFixed(2)}</p>
                  </div>
                  <p className='text-sm md:text-md'>
                    {holding.returnPercent.toFixed(2)}%
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
              <AnimateHeight duration={300} height={heights[i]}>
                {holding.purchases.map((purchase, j) => (
                  <div
                    key={`purchase-${j}`}
                    className='mb-7 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_minmax(0,3fr)_minmax(0,1fr)] items-center gap-x-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)]'
                  >
                    <div className='self-start'>
                      <p className='font-medium text-white'>
                        {formatDate(purchase.purchaseDate)}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='mb-1 text-white'>
                        {purchase.value.toFixed(2)}
                      </p>
                      <p className='text-sm text-blue1 md:text-md'>
                        {purchase.quantity} shares
                      </p>
                    </div>
                    <div
                      className={`text-right ${
                        purchase.return >= 0 ? 'text-green' : 'text-red'
                      }`}
                    >
                      <div className='mb-1 inline-flex w-full max-w-[100px] items-center justify-between gap-3'>
                        <ChevronUp
                          size={20}
                          color={
                            purchase.return >= 0 ? COLORS.green : COLORS.red
                          }
                          className={`${
                            purchase.return >= 0 ? '' : 'rotate-180'
                          }`}
                        />
                        <p>{purchase.return.toFixed(2)}</p>
                      </div>
                      <p className='text-sm md:text-md'>
                        {purchase.returnPercent.toFixed(2)}%
                      </p>
                    </div>
                    {/* <IconButton
                      icon={<Edit size={16} color={COLORS.grey1} />}
                      onClick={() => {}}
                      classes='justify-self-end'
                    /> */}
                  </div>
                ))}
              </AnimateHeight>
              {i !== portfolioHoldings.holdings.length - 1 && (
                <hr className='border-b-1 mb-6 border-grey2' />
              )}
            </Fragment>
          ))}
        </>
      )}
    </div>
  );
}
