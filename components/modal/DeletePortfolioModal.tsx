import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { removePortfolio } from '@/store/slices/portfoliosSlice';
import { closeModal } from '@/store/slices/modalSlice';
import Button from '../UI/Button';

export default function DeletePortfolioModal() {
  const router = useRouter();
  const { portfolioId } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return null;

  const handleDeletePortfolio = async () => {
    await axios.delete(`/api/users/${user.uid}/portfolios/${portfolioId}`);
    dispatch(removePortfolio(portfolioId));
    router.push('/');
  };

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Delete Portfolio
      </h2>
      <p className='mb-8 text-blue1 md:text-lg'>
        Are you sure you want to delete this portfolio?
      </p>
      <div className='grid gap-4'>
        <Button
          type='button'
          onClick={async () => {
            await handleDeletePortfolio();
            dispatch(closeModal());
          }}
          hierarchy='secondary'
          font='font-semibold'
        >
          Confirm
        </Button>
        <Button
          type='button'
          onClick={() => dispatch(closeModal())}
          hierarchy='tertiary'
          font='font-semibold'
        >
          Cancel
        </Button>
      </div>
    </>
  );
}
