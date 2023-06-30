import Carousel from '@/components/UI/Carousel';
import AssetCard, { type Asset } from '@/components/cards/AssetCard';

export default function Trending({ trending }: { trending: Asset[] }) {
  return (
    <Carousel title='Trending' margin='mb-section'>
      {trending.map((asset) => (
        <AssetCard
          symbol={asset.symbol}
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
