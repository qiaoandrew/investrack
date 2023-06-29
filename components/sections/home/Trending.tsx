import { useState } from 'react';
import Carousel from '@/components/UI/Carousel';
import AssetCard from '@/components/cards/AssetCard';

const TRENDING = [
  {
    label: 'TSLA',
    price: 4135.21,
    change: 0.87,
    changePercent: 1.28,
  },
  {
    label: 'AAPL',
    price: 4135.21,
    change: 0.87,
    changePercent: 1.28,
  },
  {
    label: 'AMZN',
    price: 4135.21,
    change: 0.87,
    changePercent: 1.28,
  },
  {
    label: 'GOOG',
    price: 4135.21,
    change: 0.87,
    changePercent: 1.28,
  },
  {
    label: 'FB',
    price: 4135.21,
    change: 0.87,
    changePercent: 1.28,
  },
  {
    label: 'MSFT',
    price: 4135.21,
    change: 0.87,
    changePercent: 1.28,
  },
];

const DROPDOWN_OPTIONS = ['US', 'IN', 'IT', 'AU', 'JP', 'UK'];

export default function Trending() {
  const [selectedOption, setSelectedOption] = useState('US');

  return (
    <Carousel
      title='Trending'
      selectionOption={selectedOption}
      setSelectedOption={setSelectedOption}
      dropdownOptions={DROPDOWN_OPTIONS}
      dropdownLabelSize='w-6'
      margin='mb-section'
    >
      {TRENDING.map((asset) => (
        <AssetCard
          key={asset.label}
          label={asset.label}
          price={asset.price}
          change={asset.change}
          changePercent={asset.changePercent}
          route={`/stocks/${asset.label}`}
        />
      ))}
    </Carousel>
  );
}
