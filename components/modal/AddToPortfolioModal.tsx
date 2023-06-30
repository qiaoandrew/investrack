import { useState } from 'react';
import Select from '../UI/Select';

const PORTFOLIO = [
  {
    id: 1,
    name: 'Portfolio 1',
  },
  {
    id: 2,
    name: 'Portfolio 2',
  },
  {
    id: 3,
    name: 'Portfolio 3',
  },
  {
    id: 4,
    name: 'Portfolio 4',
  },
  {
    id: 5,
    name: 'Portfolio 5',
  },
  {
    id: 6,
    name: 'Portfolio 6',
  },
];

export default function AddToPortfolioModal() {
  const [selectedOption, setSelectedOption] = useState<{
    id: number;
    name: string;
  } | null>(null);

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Add To Portfolio
      </h2>
      <Select
        selectedOption={
          selectedOption
            ? {
                label: selectedOption.name,
                value: selectedOption.id,
              }
            : null
        }
        setSelectedOption={(option) =>
          setSelectedOption({
            id: option.value,
            name: option.label,
          })
        }
        options={PORTFOLIO.map((portfolio) => ({
          label: portfolio.name,
          value: portfolio.id,
        }))}
        placeholder='Select Portfolio'
        noOptionsMessage='You have no portfolios yet.'
      />
    </>
  );
}
