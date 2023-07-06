import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, List } from 'react-feather';

import Button from '@/components/UI/Button';

import { AppDispatch, RootState } from '@/store/store';
import { openModal } from '@/store/slices/modalSlice';
import { COLORS } from '@/constants/colors';

type HeaderProps = {
  name: string;
  symbol: string;
  exchange: string;
};

export default function Header({ name, symbol, exchange }: HeaderProps) {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <section className='mx-dashboard mb-6 2xl:mb-8'>
      <div className='mb-7 items-center justify-between gap-6 xl:flex 2xl:mb-9'>
        <div>
          <h1 className='mb-3 line-clamp-1 text-4xl font-semibold text-white 2xl:text-5xl'>
            {name}
          </h1>
          <p className='text-lg text-grey1 2xl:text-xl'>
            {symbol} | {exchange}
          </p>
        </div>
        <div className='hidden flex-shrink-0 gap-4 xl:flex'>
          <Button
            hierarchy='senary'
            type='button'
            onClick={() => {
              user
                ? dispatch(openModal('addToWatchlist'))
                : dispatch(openModal('accountRequired'));
            }}
            icon={<List width={20} height={20} color={COLORS.grey1} />}
            iconPosition='right-3'
            padding='pl-3 pr-10 py-1.5'
          >
            Add to Watchlist
          </Button>
          <Button
            hierarchy='senary'
            type='button'
            onClick={() => {
              user
                ? dispatch(openModal('addToPortfolio'))
                : dispatch(openModal('accountRequired'));
            }}
            icon={<Briefcase width={20} height={20} color={COLORS.grey1} />}
            iconPosition='right-3'
            padding='pl-3 pr-10 py-1.5'
          >
            Add to Portfolio
          </Button>
        </div>
      </div>
      <hr className='border-b-1 border-grey2' />
    </section>
  );
}
