import { useState } from 'react';
import { useFormik } from 'formik';
import DropdownLarge from '../UI/DropdownLarge';
import DateInput from '../UI/DateInput';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';

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
  const [selectedPortfolio, setSelectedPortfolio] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const formik = useFormik({
    initialValues: {
      date: {
        month: '',
        day: '',
        year: '',
      },
      numShares: '',
      price: '',
    },
    onSubmit: (values) => {},
  });

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Add To Portfolio
      </h2>
      <DropdownLarge
        selectedOption={
          selectedPortfolio
            ? {
                label: selectedPortfolio.name,
                value: selectedPortfolio.id,
              }
            : null
        }
        setSelectedOption={(option) =>
          setSelectedPortfolio({
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
        margin='mb-5'
      />
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          id='numShares'
          name='numShares'
          type='text'
          placeholder='Number of Shares'
          value={formik.values.numShares}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          bg='bg-grey3'
          classes='mb-5'
        />
        <TextInput
          id='price'
          name='price'
          type='text'
          placeholder='Price'
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          bg='bg-grey3'
          classes='mb-5'
        />
        <DateInput
          label='Date Purchased'
          value={formik.values.date}
          setValue={(value) => formik.setFieldValue('date', value)}
          margin='mb-9'
        />
        <Button
          type='submit'
          hierarchy='secondary'
          font='font-semibold'
          classes='w-full'
        >
          Confirm
        </Button>
      </form>
    </>
  );
}
