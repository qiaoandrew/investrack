import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface SearchResult {
  symbol: string;
  name: string;
  exchange: string;
}

export default function useSearchResults(query: string) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>(
    DEFAULT_SEARCH_RESULTS
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getSearchResults = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/stocks/search', {
        params: { query },
      });
      setSearchResults(data);
    } catch (error) {
      console.error(error);
      setError(true);
    }
    setLoading(false);
  }, [query]);

  const debouncer: any = useRef();

  useEffect(() => {
    debouncer.current = debounce(() => getSearchResults(), 300);
  }, [getSearchResults]);

  const debouncedGetSearchResults = useCallback(() => {
    debouncer.current();
  }, []);

  useEffect(() => {
    if (query) {
      debouncedGetSearchResults();
    } else {
      setSearchResults(DEFAULT_SEARCH_RESULTS);
    }

    return () => {
      if (debouncer.current) {
        debouncer.current.cancel();
      }
    };
  }, [query, debouncedGetSearchResults]);

  return { searchResults, loading, error };
}

const DEFAULT_SEARCH_RESULTS: SearchResult[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'GOOG',
    name: 'Alphabet Inc.',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    exchange: 'NASDAQ',
  },
];
