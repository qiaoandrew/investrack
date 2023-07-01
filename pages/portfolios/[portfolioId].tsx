import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { openModal } from '@/store/slices/modalSlice';
import AnimateHeight from 'react-animate-height';
import IconButton from '@/components/UI/IconButton';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { ChevronDown, ChevronUp, Edit, Trash } from 'react-feather';
import { COLORS } from '@/constants/colors';

const HOLDINGS = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 125.9,
    numShares: 120,
    transactions: [
      {
        date: '03/01/2021',
        time: '12:00 PM',
        numShares: 100,
        price: 123.45,
      },
      {
        date: '03/05/2021',
        time: '12:00 PM',
        numShares: 20,
        price: 120.49,
      },
    ],
  },
  {
    symbol: 'TSLA',
    name: 'Apple Inc.',
    price: 125.9,
    numShares: 120,
    transactions: [
      {
        date: '03/01/2021',
        time: '12:00 PM',
        numShares: 100,
        price: 123.45,
      },
      {
        date: '03/05/2021',
        time: '12:00 PM',
        numShares: 20,
        price: 120.49,
      },
    ],
  },
  {
    symbol: 'META',
    name: 'Apple Inc.',
    price: 125.9,
    numShares: 120,
    transactions: [
      {
        date: '03/01/2021',
        time: '12:00 PM',
        numShares: 100,
        price: 123.45,
      },
      {
        date: '03/05/2021',
        time: '12:00 PM',
        numShares: 20,
        price: 120.49,
      },
    ],
  },
];

export default function Portfolio() {
  const router = useRouter();
  const { portfolioId } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const portfolio = useSelector((state: RootState) =>
    state.portfolios.portfolios.find(
      (portfolio) => portfolio._id === portfolioId
    )
  );

  const [heights, setHeights] = useState<(0 | 'auto')[]>(
    Array(HOLDINGS.length).fill(0)
  );

  if (!portfolio) return <LoadingSpinner />;

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
      <p className='mb-4 text-8xl font-semibold text-white'>$1,267.68</p>
      <div className='mb-12 flex items-center gap-2'>
        <ChevronUp size={24} color={COLORS.green} />
        <p className='text-lg xl:text-xl'>
          <span className='text-green'>0.87 (1.28%)</span>{' '}
          <span className='text-white'>All Time</span>
        </p>
      </div>
      <div className='mb-4 grid grid-cols-[3fr_3fr_3fr_1fr] gap-x-6 text-right text-sm text-grey1 md:mb-5 md:grid-cols-[3fr_2fr_2fr_1fr] md:text-md'>
        <div />
        <p>Total Value</p>
        <p>Total Return</p>
      </div>
      {HOLDINGS.map((holding, i) => (
        <Fragment key={holding.symbol}>
          <div
            className='mb-7 grid grid-cols-[3fr_3fr_3fr_1fr] items-center gap-x-6 md:grid-cols-[3fr_2fr_2fr_1fr]'
            key={holding.symbol}
          >
            <div>
              <p className='mb-1 font-semibold text-white md:text-lg'>
                {holding.symbol}
              </p>
              <p className='text-sm text-blue1 md:text-md'>{holding.name}</p>
            </div>
            <div className='text-right'>
              <p className='mb-1 text-white md:text-lg'>{holding.price}</p>
              <p className='text-sm text-blue1 md:text-md'>
                {holding.numShares} shares
              </p>
            </div>
            <div className='text-right text-green'>
              <div className='mb-1 inline-flex items-center gap-3'>
                <ChevronUp size={20} color={COLORS.green} />
                <p className='md:text-lg'>0.87</p>
              </div>
              <p className='text-sm md:text-md'>0.85%</p>
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
          {holding.transactions.map((transaction, j) => (
            <AnimateHeight
              duration={300}
              height={heights[i]}
              key={`transaction-${j}`}
            >
              <div className='mb-7 grid grid-cols-[3fr_3fr_3fr_1fr] items-center gap-x-6 md:grid-cols-[3fr_2fr_2fr_1fr]'>
                <div>
                  <p className='mb-1 font-medium text-white'>
                    {transaction.date}
                  </p>
                  <p className='text-sm text-blue1 md:text-md'>
                    {transaction.time}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='mb-1 text-white'>{transaction.price}</p>
                  <p className='text-sm text-blue1 md:text-md'>
                    {transaction.numShares} shares
                  </p>
                </div>
                <div className='text-right text-green'>
                  <div className='mb-1 inline-flex items-center gap-3'>
                    <ChevronUp size={20} color={COLORS.green} />
                    <p>0.87</p>
                  </div>
                  <p className='text-sm md:text-md'>0.85%</p>
                </div>
                <IconButton
                  icon={<Edit size={16} color={COLORS.grey1} />}
                  onClick={() => {}}
                  classes='justify-self-end'
                />
              </div>
            </AnimateHeight>
          ))}
          {i !== HOLDINGS.length - 1 && (
            <hr className='border-b-1 mb-6 border-grey2' />
          )}
        </Fragment>
      ))}
    </div>
  );
}
