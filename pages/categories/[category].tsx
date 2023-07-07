import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import StockList from '@/components/UI/StockList';

import { CATEGORIES } from '@/constants/categories';
import { StockPrice } from '@/types/types';

export default function Category() {
  const [stocks, setStocks] = useState<StockPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      setError(false);
      if (!category) return;
      try {
        const { data } = await axios.get('/api/stocks/categories', {
          params: { type: category },
        });
        setStocks(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [category]);

  return (
    <section className='mx-dashboard'>
      <h1 className='mb-4 text-4xl font-semibold text-white 2xl:text-5xl'>
        {CATEGORIES.find((c) => c.id === category)?.label}
      </h1>
      <StockList
        stocks={stocks}
        loading={loading}
        error={error}
        noStocksMessage='No stocks found. Please try again or select a different category.'
      />
    </section>
  );
}
