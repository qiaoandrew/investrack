import { Fragment } from 'react';
import Link from 'next/link';
import { SearchResult } from '@/interfaces/interfaces';
import LoadingSpinner from './LoadingSpinner';

interface SearchResultsProps {
  searchResults: SearchResult[];
  showSearchResults: boolean;
  loading: boolean;
  error: boolean;
  maxHeight: string;
}

export default function SearchResults({
  searchResults,
  showSearchResults,
  loading,
  error,
  maxHeight,
}: SearchResultsProps) {
  let state = '';

  if (loading) {
    state = 'loading';
  } else if (error) {
    state = 'error';
  } else if (searchResults.length !== 0) {
    state = 'results';
  } else {
    state = 'noResults';
  }

  return (
    <div
      className={`transition-300 no-scrollbar absolute top-[calc(100%+24px)] w-full overflow-hidden overflow-y-scroll overscroll-contain rounded-xl border border-grey2 bg-black ${maxHeight} ${
        showSearchResults
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      {state === 'loading' && <LoadingSpinner margin='my-6' />}
      {state === 'error' && (
        <p className='p-4 text-white'>
          An error occured. Please try again later.
        </p>
      )}
      {state === 'noResults' && (
        <p className='p-4 text-white'>No results found.</p>
      )}
      {state === 'results' && (
        <>
          {searchResults.map((result, i) => (
            <Fragment key={result.symbol}>
              <Link
                href={`/stocks/${result.symbol}`}
                className='transition-300 m-1.5 flex items-center justify-between rounded-md p-3 hover:bg-grey3'
              >
                <div>
                  <p className='mb-1 font-semibold text-white xl:text-lg'>
                    {result.symbol}
                  </p>
                  <p className='text-sm font-medium text-blue1 xl:text-md'>
                    {result.name}
                  </p>
                </div>
                <p className='text-sm text-blue1 xl:text-md'>
                  {result.exchange}
                </p>
              </Link>
            </Fragment>
          ))}
          {searchResults.length > 3 && (
            <div className='pointer-events-none sticky inset-x-0 bottom-0 -mt-8 h-10 bg-gradient-to-t from-black to-transparent' />
          )}
        </>
      )}
    </div>
  );
}
