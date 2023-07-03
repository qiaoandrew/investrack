import { Fragment } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'react-feather';

import { StockPrice } from '@/interfaces/interfaces';
import { COLORS } from '@/constants/colors';

export default function StockList({ stocks }: { stocks: StockPrice[] }) {
  if (!stocks) return null;
  return (
    <div className='max-w-[566px]'>
      {stocks.map((stock, i) => (
        <Fragment key={i}>
          <Link
            href={`/stocks/${stock.symbol}`}
            className={`transition-300 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,4fr)] items-center gap-4 py-4 hover:bg-grey3 hover:bg-opacity-60 xs:px-4 md:grid-cols-[minmax(0,8fr)_minmax(0,2fr)_minmax(0,4fr)] 
              ${i === 0 ? 'rounded-t-sm' : ''} 
              ${i === stocks.length - 1 ? 'rounded-b-sm' : ''}`}
          >
            <div className='grid flex-shrink gap-1.5 xl:grid-cols-[minmax(0,1fr),minmax(0,3fr)] xl:items-center xl:gap-0'>
              <p className='text-base line-clamp-1 font-medium text-white xl:order-2'>
                {stock.name}
              </p>
              <p className='text-sm text-blue1 xl:w-16'>{stock.symbol}</p>
            </div>
            <p className='text-base justify-self-end font-medium text-white'>
              {stock.price}
            </p>
            <div className='flex flex-shrink-0 items-center gap-1 xs:gap-1.5'>
              {stock.change > 0 ? (
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
                  stock.change > 0 ? 'text-green' : 'text-red'
                }`}
              >
                {stock.change} ({stock.changePercent}%)
              </p>
            </div>
          </Link>
          {i !== stocks.length - 1 && (
            <hr className='border-b-1 border-grey2 border-opacity-60' />
          )}
        </Fragment>
      ))}
    </div>
  );
}
