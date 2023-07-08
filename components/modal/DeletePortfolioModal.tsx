import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/UI/Button';
import InputFeedback from '@/components/UI/InputFeedback';
import LoadingSpinner from '../UI/LoadingSpinner';

import { AppDispatch, RootState } from '@/store/store';
import { removePortfolio } from '@/store/slices/portfoliosSlice';
import { closeModal } from '@/store/slices/modalSlice';

export default function DeletePortfolioModal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { portfolioId } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return null;

  const handleDeletePortfolio = async () => {
    setError(false);
    try {
      await axios.delete(`/api/users/${user.uid}/portfolios/${portfolioId}`);
      dispatch(removePortfolio(portfolioId));
      router.push('/');
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Delete Portfolio
      </h2>
      <div className='mb-8'>
        <p className='text-blue1 md:text-lg'>
          Are you sure you want to delete this portfolio?
        </p>
        {error && (
          <InputFeedback state='error'>
            There was an error deleting this portfolio. Please try again later.
          </InputFeedback>
        )}
      </div>
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
