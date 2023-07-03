import axios from 'axios';
import { useEffect, useState } from 'react';

import Carousel from '@/components/UI/Carousel';
import AssetCard from '@/components/cards/AssetCard';

import { TrendingStock } from '@/interfaces/interfaces';

export default function Trending() {
  const [trending, setTrending] = useState<TrendingStock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await axios.get('/api/stocks/trending');
      setTrending(data as TrendingStock[]);
      setLoading(false);
    };

    fetchTrending();
  }, []);

  return (
    <Carousel title='Trending' loading={loading} margin='mb-section'>
      {trending.map((asset) => (
        <AssetCard
          label={asset.symbol}
          price={asset.price}
          change={asset.change}
          changePercent={asset.changePercent}
          route={`/stocks/${asset.symbol}`}
          key={asset.symbol}
        />
      ))}
    </Carousel>
  );
}
