import axios from 'axios';
import { useEffect, useState } from 'react';

import Carousel from '@/components/UI/Carousel';
import AssetCard from '@/components/cards/AssetCard';

import { TrendingStock } from '@/types/types';

export default function Trending() {
  const [trending, setTrending] = useState<TrendingStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/stocks/trending');
        setTrending(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <Carousel
      title='Trending'
      loading={loading}
      error={error}
      classes='mb-section'
    >
      {trending.map((stock) => (
        <AssetCard
          label={stock.symbol}
          price={stock.price}
          change={stock.change}
          changePercent={stock.changePercent}
          route={`/stocks/${stock.symbol}`}
          key={stock.symbol}
        />
      ))}
    </Carousel>
  );
}
