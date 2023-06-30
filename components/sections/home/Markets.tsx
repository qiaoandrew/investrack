import axios from 'axios';
import { useEffect, useState } from 'react';
import Carousel from '@/components/UI/Carousel';
import AssetCard, { type Asset } from '@/components/cards/AssetCard';

export default function Markets() {
  const [markets, setMarkets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState({
    label: 'US',
    value: 'united states',
  });

  useEffect(() => {
    const fetchMarkets = async () => {
      setLoading(true);
      const { data } = await axios.get('/api/stocks/markets', {
        params: { country: selectedOption.value },
      });
      setMarkets(data.map((asset: any) => ({ ...asset, label: asset.name })));
      setLoading(false);
    };

    fetchMarkets();
  }, [selectedOption]);

  return (
    <Carousel
      title='Markets'
      loading={loading}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      dropdownOptions={DROPDOWN_OPTIONS}
      dropdownLabelSize='w-6'
      margin='mb-section'
    >
      {markets.map((market) => (
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

const DROPDOWN_OPTIONS = [
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
