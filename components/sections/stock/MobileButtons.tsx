import { useDispatch } from 'react-redux';
import { List, Briefcase } from 'react-feather';

import Button from '@/components/UI/Button';

import { AppDispatch } from '@/store/store';
import { openModal } from '@/store/slices/modalSlice';
import { COLORS } from '@/constants/colors';

export default function MobileButtons() {
  const dispatch: AppDispatch = useDispatch();

  return (
    <section className='mx-dashboard mb-14 grid gap-5 xl:hidden'>
      <Button
        type='button'
        onClick={() => dispatch(openModal('addToWatchlist'))}
        hierarchy='quinary'
        icon={<List color={COLORS.grey1} size={20} />}
        classes='w-full'
      >
        Add to Watchlist
      </Button>
      <Button
        type='button'
        onClick={() => dispatch(openModal('addToPortfolio'))}
        hierarchy='quinary'
        icon={<Briefcase color={COLORS.grey1} size={20} />}
        classes='w-full'
      >
        Add to Portfolio
      </Button>
    </section>
  );
}
