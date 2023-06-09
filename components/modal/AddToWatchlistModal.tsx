import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/UI/Button';
import InputFeedback from '@/components/UI/InputFeedback';
import LoadingSpinner from '@/components/UI/LoadingSpinner';

import { AppDispatch, RootState } from '@/store/store';
import { closeModal } from '@/store/slices/modalSlice';
import { updateWatchlists } from '@/store/slices/watchlistsSlice';

export default function AddToWatchlistModal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedWatchlistIds, setSelectedWatchlistIds] = useState<string[]>(
    []
  );

  const router = useRouter();
  const { symbol } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { watchlists } = useSelector((state: RootState) => state.watchlists);

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    watchlistId: string
  ) => {
    if (e.target.checked) {
      setSelectedWatchlistIds((prev) => [...prev, watchlistId]);
    } else {
      setSelectedWatchlistIds((prev) =>
        prev.filter((id) => id !== watchlistId)
      );
    }
  };

  const handleConfirm = async () => {
    if (!user) return dispatch(closeModal());
    setLoading(true);
    setError(false);
    try {
      const { data } = await axios.put(`/api/users/${user.uid}/watchlists`, {
        watchlistIds: selectedWatchlistIds,
        symbol,
      });
      dispatch(updateWatchlists(data));
      dispatch(closeModal());
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={loading ? 'opacity-0' : 'opacity-100'}>
        <h2 className='mb-5 text-3xl font-semibold text-white'>
          Add To Watchlist
        </h2>
        <div className='mb-10'>
          <div className='relative'>
            <div
              className={`no-scrollbar grid max-h-[220px] gap-6 overflow-y-scroll ${
                watchlists.length > 4 ? 'pb-6' : ''
              }`}
            >
              {watchlists.length > 0 ? (
                watchlists.map((watchlist) => (
                  <label
                    htmlFor={watchlist._id}
                    className='flex cursor-pointer items-center justify-start gap-4'
                    key={watchlist._id}
                  >
                    <input
                      id={watchlist._id}
                      type='checkbox'
                      onChange={(e) => handleSelect(e, watchlist._id)}
                      className='transition-300 rounded h-5 w-5 cursor-pointer appearance-none rounded-2xs border border-white checked:bg-white'
                    />
                    <p className='text-white'>{watchlist.name}</p>
                  </label>
                ))
              ) : (
                <p className='text-blue1 md:text-lg'>
                  You don&apos;t have any watchlists yet.
                </p>
              )}
            </div>
            {watchlists.length > 5 && (
              <div className='pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-grey3 to-transparent' />
            )}
          </div>
          {error && (
            <InputFeedback state='error'>
              There was an error adding the stock into your watchlist. Please
              try again later.
            </InputFeedback>
          )}
        </div>
        {watchlists.length > 0 ? (
          <Button
            type='button'
            onClick={handleConfirm}
            hierarchy='secondary'
            font='font-semibold'
            classes='w-full'
          >
            Confirm
          </Button>
        ) : (
          <Button
            type='button'
            onClick={() => dispatch(closeModal())}
            hierarchy='secondary'
            font='font-semibold'
            classes='w-full'
          >
            OK
          </Button>
        )}
      </div>
      {loading && (
        <LoadingSpinner classes='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
      )}
    </>
  );
}
