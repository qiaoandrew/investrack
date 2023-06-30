import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { closeModal } from '@/store/slices/modalSlice';
import Button from '../UI/Button';

const WATCHLISTS = [
  {
    id: '1',
    name: 'Watchlist 1',
  },
  {
    id: '2',
    name: 'Watchlist 2',
  },
  {
    id: '3',
    name: 'Watchlist 3',
  },
  {
    id: '4',
    name: 'Watchlist 4',
  },
  {
    id: '5',
    name: 'Watchlist 5',
  },
  {
    id: '6',
    name: 'Watchlist 6',
  },
  {
    id: '7',
    name: 'Watchlist 7',
  },
];

export default function AddToWatchlistModal() {
  const [selectedWatchlistIds, setSelectedWatchlistIds] = useState<string[]>(
    []
  );

  const dispatch: AppDispatch = useDispatch();

  const handleSelect = (event: any, watchlistId: string) => {
    if (event.target.checked) {
      setSelectedWatchlistIds((prevState) => [...prevState, watchlistId]);
    } else {
      setSelectedWatchlistIds((prevState) =>
        prevState.filter((id) => id !== watchlistId)
      );
    }
  };

  const handleConfirm = async () => {
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
            WATCHLISTS.length > 4 ? 'pb-8' : ''
          }`}
        >
          {WATCHLISTS.length > 0 ? (
            WATCHLISTS.map((watchlist) => (
              <label
                htmlFor={watchlist.id}
                className='flex cursor-pointer items-center justify-start gap-4'
                key={watchlist.id}
              >
                <input
                  id={watchlist.id}
                  type='checkbox'
                  onChange={(event) => handleSelect(event, watchlist.id)}
                  className='transition-300 rounded h-5 w-5 cursor-pointer appearance-none rounded-2xs border border-white checked:bg-white'
                />
                <p className='text-base text-white'>{watchlist.name}</p>
              </label>
            ))
          ) : (
            <p className='text-white'>
              You don&apos;t have any watchlists yet.
            </p>
          )}
        </div>
        {WATCHLISTS.length > 5 && (
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-grey3 to-transparent'></div>
        )}
      </div>
      {WATCHLISTS.length > 0 ? (
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
