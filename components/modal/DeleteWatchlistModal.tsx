import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../UI/Button';
import InputFeedback from '../UI/InputFeedback';

import { AppDispatch, RootState } from '@/store/store';
import { removeWatchlist } from '@/store/slices/watchlistsSlice';
import { closeModal } from '@/store/slices/modalSlice';

export default function DeleteWatchlistModal() {
  const [error, setError] = useState(false);

  const router = useRouter();
  const { watchlistId } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return null;

  const handleDeleteWatchlist = async () => {
    setError(false);
    try {
      await axios.delete(`/api/users/${user.uid}/watchlists/${watchlistId}`);
      dispatch(removeWatchlist(watchlistId));
      router.push('/');
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Delete Watchlist
      </h2>
      <div className='mb-8'>
        <p className='text-blue1 md:text-lg'>
          Are you sure you want to delete this watchlist?
        </p>
        {error && (
          <InputFeedback state='error'>
            There was an error deleting this watchlist. Please try again later.
          </InputFeedback>
        )}
      </div>
      <div className='grid gap-4'>
        <Button
          type='button'
          onClick={async () => {
            await handleDeleteWatchlist();
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
