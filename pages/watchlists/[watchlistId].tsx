import IconButton from '@/components/UI/IconButton';
import { COLORS } from '@/constants/colors';
import Link from 'next/link';
import { Fragment } from 'react';
import { ChevronDown, ChevronUp, Edit, Trash, X } from 'react-feather';

const ASSETS = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 123.45,
    change: 0.12,
    changePercent: 0.12,
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 123.45,
    change: 0.12,
    changePercent: 0.12,
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 123.45,
    change: 0.12,
    changePercent: 0.12,
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 123.45,
    change: 0.12,
    changePercent: 0.12,
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 123.45,
    change: 0.12,
    changePercent: 0.12,
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 123.45,
    change: 0.12,
    changePercent: 0.12,
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 123.45,
    change: 0.12,
    changePercent: 0.12,
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 123.45,
    change: 0.12,
    changePercent: 0.12,
  },
];

export default function Watchlist() {
  return (
    <div className='mx-dashboard max-w-[566px]'>
      <div className='mb-3 flex items-center justify-between'>
        <h1 className='text-3xl font-semibold text-white'>Watchlist 1</h1>
        <div className='flex gap-4'>
          <IconButton
            icon={<Edit size={16} color={COLORS.grey1} />}
            onClick={() => {}}
          />
          <IconButton
            icon={<Trash size={16} color={COLORS.grey1} />}
            onClick={() => {}}
          />
        </div>
      </div>
      {ASSETS.map((asset, i) => (
        <Fragment key={asset.ticker}>
          <Link
            href={`/stock/${asset.ticker}`}
            className={`transition-300 grid grid-cols-[8fr_2fr_4fr_1fr] items-center gap-4 py-4 hover:bg-grey3 hover:bg-opacity-60 xs:px-4 
              ${i === 0 ? 'rounded-t-sm' : ''} 
              ${i === ASSETS.length - 1 ? 'rounded-b-sm' : ''}`}
          >
            <div className='flex flex-col gap-1.5 xl:flex-row-reverse xl:items-center xl:gap-0 xl:justify-self-start'>
              <p className='text-base line-clamp-1 font-medium text-white'>
                {asset.name}
              </p>
              <p className='text-sm text-blue1 xl:w-16'>{asset.ticker}</p>
            </div>
            <p className='text-base justify-self-end font-medium text-white'>
              {asset.price}
            </p>
            <div className='flex items-center gap-1 xs:gap-1.5'>
              {asset.change > 0 ? (
                <ChevronUp size={20} color={COLORS.green} />
              ) : (
                <ChevronDown size={20} color={COLORS.red} />
              )}
              <p
                className={`text-base whitespace-nowrap ${
                  asset.change > 0 ? 'text-green' : 'text-red'
                }`}
              >
                {asset.change} ({asset.changePercent}%)
              </p>
            </div>
            <div className='transition-300 -m-1.5 justify-self-end rounded-full p-1.5 hover:bg-grey2 hover:bg-opacity-50'>
              <X size={20} color={COLORS.grey1} />
            </div>
          </Link>
          {i !== ASSETS.length - 1 && (
            <hr className='border-b-1 border-grey2 border-opacity-60' />
          )}
        </Fragment>
      ))}
    </div>
  );
}
