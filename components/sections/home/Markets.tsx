import axios from 'axios';
import { useEffect, useState } from 'react';

import Carousel from '@/components/UI/Carousel';
import AssetCard from '@/components/cards/AssetCard';

import { MarketSummary } from '@/types/types';

export default function Markets() {
  const [markets, setMarkets] = useState<MarketSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    label: 'US',
    value: 'united states',
  });

  useEffect(() => {
    const fetchMarkets = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/stocks/market-summary', {
          params: { country: selectedOption.value },
        });
        setMarkets(data.map((asset: any) => ({ ...asset, label: asset.name })));
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, [selectedOption]);

  return (
    <Carousel
      title='Markets'
      loading={loading}
      error={error}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      dropdownOptions={MARKET_DROPDOWN_OPTIONS}
      dropdownLabelSize='w-6'
      margin='mb-section'
    >
      {markets.map((market) => (
        <AssetCard
          key={market.name}
          label={market.name}
          price={market.price}
          change={market.change}
          changePercent={market.changePercent}
        />
      ))}
    </Carousel>
  );
}

const MARKET_DROPDOWN_OPTIONS = [
  {
    label: 'US',
    value: 'united states',
  },
  {
    label: 'CA',
    value: 'canada',
  },
  {
    label: 'UK',
    value: 'united kingdom',
  },
  {
    label: 'HK',
    value: 'hong kong',
  },
  {
    label: 'IN',
    value: 'india',
  },
  {
    label: 'DE',
    value: 'germany',
  },
  {
    label: 'AU',
    value: 'australia',
  },
  {
    label: 'SG',
    value: 'singapore',
  },
  {
    label: 'ES',
    value: 'spain',
  },
  {
    label: 'IT',
    value: 'italy',
  },
  {
    label: 'BR',
    value: 'brazil',
  },
  {
    label: 'NZ',
    value: 'new zealand',
  },
];
