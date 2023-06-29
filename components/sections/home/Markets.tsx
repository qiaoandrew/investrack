import { useState } from 'react';
import Carousel from '@/components/UI/Carousel';
import AssetCard from '@/components/cards/AssetCard';

const MARKETS = [
  {
    label: 'S&P 500',
    price: 4135.21,
    change: 0.87,
    changePercent: 1.28,
  },
  {
    label: 'Dow Jones',
    price: 33821.3,
    change: 15.66,
    changePercent: 0.05,
  },
  {
    label: 'Nasdaq',
    price: 13986.48,
    change: 139.84,
    changePercent: 1.01,
  },
  {
    label: 'Russell 2000',
    price: 2237.27,
    change: 0.87,
    changePercent: 1.28,
  },
  {
    label: 'Crude Oil',
    price: 63.13,
    change: 0.87,
    changePercent: 1.28,
  },
  {
    label: 'Gold',
    price: 1767.5,
    change: 0.87,
    changePercent: 1.28,
  },
  {
    label: 'Silver',
    price: 25.98,
    change: 0.87,
    changePercent: 1.28,
  },
  {
    label: 'EUR/USD',
    price: 1.2035,
    change: 0.87,
    changePercent: 1.28,
  },
];

const DROPDOWN_OPTIONS = ['US', 'IN', 'IT', 'AU', 'JP', 'UK'];

export default function Markets() {
  const [selectedOption, setSelectedOption] = useState('US');

  return (
    <Carousel
      title='Markets'
      selectionOption={selectedOption}
      setSelectedOption={setSelectedOption}
      dropdownOptions={DROPDOWN_OPTIONS}
      dropdownLabelSize='w-6'
      margin='mb-section'
    >
      {MARKETS.map((market) => (
        <AssetCard
          key={market.label}
          label={market.label}
          price={market.price}
          change={market.change}
          changePercent={market.changePercent}
        />
      ))}
    </Carousel>
  );
}
