import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { updatePortfolio } from '@/store/slices/portfoliosSlice';
import { closeModal } from '@/store/slices/modalSlice';
import { useFormik } from 'formik';
import DropdownLarge from '../UI/DropdownLarge';
import DateInput from '../UI/DateInput';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';

export default function AddToPortfolioModal() {
  const [selectedPortfolio, setSelectedPortfolio] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { portfolios } = useSelector((state: RootState) => state.portfolios);

  const router = useRouter();
  const { symbol } = router.query;

  const formik = useFormik({
    initialValues: {
      purchaseDate: {
        month: '',
        day: '',
        year: '',
      },
      quantity: '',
      purchasePrice: '',
    },
    onSubmit: async (values) => {
      if (!selectedPortfolio || !user) return;
      try {
        const { data } = await axios.post(
          `/api/users/${user.uid}/portfolios/${selectedPortfolio.id}`,
          {
            symbol,
            quantity: values.quantity,
            purchasePrice: values.purchasePrice,
            purchaseDate: values.purchaseDate,
          }
        );
        dispatch(updatePortfolio(data));
        dispatch(closeModal());
      } catch (error) {
        console.error(error);
      }
    },
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
        options={portfolios.map((portfolio) => ({
          label: portfolio.name,
          value: portfolio._id,
        }))}
        placeholder='Select Portfolio'
        noOptionsMessage='You have no portfolios yet.'
        margin='mb-5'
      />
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          id='quantity'
          name='quantity'
          type='text'
          placeholder='Number of Shares'
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          bg='bg-grey3'
          classes='mb-5'
        />
        <TextInput
          id='purchasePrice'
          name='purchasePrice'
          type='text'
          placeholder='Price'
          value={formik.values.purchasePrice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          bg='bg-grey3'
          classes='mb-5'
        />
        <DateInput
          label='Purchase Date'
          value={formik.values.purchaseDate}
          setValue={(value) => formik.setFieldValue('purchaseDate', value)}
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
