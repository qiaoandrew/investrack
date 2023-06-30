import { useState } from 'react';

export interface SearchResult {
  symbol: string;
  name: string;
  exchange: string;
}

const SEARCH_RESULTS: SearchResult[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    exchange: 'NASDAQ',
  },
];

export default function useSearchResults(searchValue: string) {
  const [searchResults, setSearchResults] =
    useState<SearchResult[]>(SEARCH_RESULTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return { searchResults, loading, error };
}
