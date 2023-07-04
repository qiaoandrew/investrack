import Carousel from '@/components/UI/Carousel';
import AssetCard from '@/components/cards/AssetCard';

import { TrendingStock } from '@/interfaces/interfaces';

export default function Trending({ trending }: { trending: TrendingStock[] }) {
  return (
    <Carousel title='Trending' margin='mb-section'>
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
