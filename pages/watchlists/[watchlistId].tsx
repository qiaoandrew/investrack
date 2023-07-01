import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { openModal } from '@/store/slices/modalSlice';
import { StockPrice } from '@/interfaces/interfaces';
import IconButton from '@/components/UI/IconButton';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { ChevronDown, ChevronUp, Edit, Trash, X } from 'react-feather';
import { COLORS } from '@/constants/colors';

export default function Watchlist() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stockPrices, setStockPrices] = useState<StockPrice[]>([]);

  const router = useRouter();
  const { watchlistId } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const watchlist = useSelector((state: RootState) =>
    state.watchlists.watchlists.find(
      (watchlist) => watchlist._id === watchlistId
    )
  );

  useEffect(() => {
    const fetchStockPrices = async () => {
      setLoading(true);
      setError('');
      try {
        if (!watchlist) return;
        const promises = watchlist.stocks.map(async (symbol) => {
          const { data } = await axios.get(`/api/stocks/price`, {
            params: { symbol },
          });
          return data;
        });
        const stockPrices = await Promise.all(promises);
        setStockPrices(stockPrices as StockPrice[]);
      } catch (error) {
        console.log(error);
        setError('Something went wrong. Please try again later.');
      }
      setLoading(false);
    };

    fetchStockPrices();
  }, [watchlist]);

  if (!watchlist) return <LoadingSpinner />;

  return (
    <div className='mx-dashboard max-w-[566px]'>
      <div className='mb-3 flex items-center justify-between'>
        <h1 className='text-3xl font-semibold text-white 2xl:text-4xl'>
          {watchlist.name}
        </h1>
        <div className='flex gap-4'>
          <IconButton
            icon={<Edit size={16} color={COLORS.grey1} />}
            onClick={() => dispatch(openModal('renameWatchlist'))}
          />
          <IconButton
            icon={<Trash size={16} color={COLORS.grey1} />}
            onClick={() => dispatch(openModal('deleteWatchlist'))}
          />
        </div>
      </div>
      {loading && <LoadingSpinner margin='mt-12' />}
      {error && <p className='mt-4 text-blue1'>{error}</p>}
      {!loading &&
        !error &&
        stockPrices.map((price, i) => (
          <Fragment key={i}>
            <Link
              href={`/stocks/${price.symbol}`}
              className={`transition-300 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,4fr)_minmax(0,1fr)] items-center gap-4 py-4 hover:bg-grey3 hover:bg-opacity-60 xs:px-4 md:grid-cols-[minmax(0,8fr)_minmax(0,2fr)_minmax(0,4fr)_minmax(0,1fr)] 
              ${i === 0 ? 'rounded-t-sm' : ''} 
              ${i === stockPrices.length - 1 ? 'rounded-b-sm' : ''}`}
            >
              <div className='flex flex-shrink flex-col gap-1.5 xl:flex-row-reverse xl:items-center xl:gap-0 xl:justify-self-start'>
                <p className='text-base line-clamp-1 font-medium text-white'>
                  {price.name}
                </p>
                <p className='text-sm text-blue1 xl:w-16'>{price.symbol}</p>
              </div>
              <p className='text-base justify-self-end font-medium text-white'>
                {price.price}
              </p>
              <div className='flex flex-shrink-0 items-center gap-1 xs:gap-1.5'>
                {price.change > 0 ? (
                  <ChevronUp
                    size={20}
                    color={COLORS.green}
                    className='flex-shrink-0'
                  />
                ) : (
                  <ChevronDown
                    size={20}
                    color={COLORS.red}
                    className='flex-shrink-0'
                  />
                )}
                <p
                  className={`text-base whitespace-nowrap ${
                    price.change > 0 ? 'text-green' : 'text-red'
                  }`}
                >
                  {price.change} ({price.changePercent}%)
                </p>
              </div>
              <div className='transition-300 -m-1.5 flex-shrink-0 justify-self-end rounded-full p-1.5 hover:bg-grey2 hover:bg-opacity-50'>
                <X size={20} color={COLORS.grey1} />
              </div>
            </Link>
            {i !== stockPrices.length - 1 && (
              <hr className='border-b-1 border-grey2 border-opacity-60' />
            )}
          </Fragment>
        ))}
    </div>
  );
}
