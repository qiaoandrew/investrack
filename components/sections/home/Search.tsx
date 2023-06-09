import { useState } from 'react';

import useSearchResults from '@/hooks/useSearchResults';
import SearchBar from '@/components/UI/SearchBar';
import SearchResults from '@/components/UI/SearchResults';

export default function Search() {
  const [query, setQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { searchResults, loading, error } = useSearchResults(query);

  return (
    <section className='mx-dashboard mb-section relative z-20'>
      <h1 className='mx-auto mb-8 max-w-[353px] text-center text-4xl font-semibold 2xl:max-w-[457px] 2xl:text-6xl'>
        <span className='text-gradient'>
          Research the markets with Investrack.
        </span>
      </h1>
      <div className='relative mx-auto max-w-[560px]'>
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSearchResults(true)}
          onBlur={() => {
            setTimeout(() => {
              setShowSearchResults(false);
            }, 300);
          }}
          placeholder='Search for stocks...'
        />
        <SearchResults
          searchResults={searchResults}
          showSearchResults={showSearchResults}
          loading={loading}
          error={error}
          maxHeight='max-h-[300px]'
        />
      </div>
    </section>
  );
}
