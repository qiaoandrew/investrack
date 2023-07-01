import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { closeModal } from '@/store/slices/modalSlice';
import Button from '../UI/Button';

export default function AddToWatchlistModal() {
  const [selectedWatchlistIds, setSelectedWatchlistIds] = useState<string[]>(
    []
  );

  const router = useRouter();
  const { symbol } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { watchlists } = useSelector((state: RootState) => state.watchlists);

  const handleSelect = (e: any, watchlistId: string) => {
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
    await axios.put(`/api/users/${user.uid}/watchlists`, {
      watchlistIds: selectedWatchlistIds,
      symbol,
    });
    dispatch(closeModal());
  };

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Add To Watchlist
      </h2>
      <div className='relative mb-8'>
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
    </>
  );
}
