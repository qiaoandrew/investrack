import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import DropdownLarge from '../UI/DropdownLarge';
import DateInput from '../UI/DateInput';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';
import InputFeedback from '../UI/InputFeedback';

import { AppDispatch, RootState } from '@/store/store';
import { updatePortfolio } from '@/store/slices/portfoliosSlice';
import { closeModal } from '@/store/slices/modalSlice';
import { validateAddToPortfolio } from '@/util/formValidation';

export default function AddToPortfolioModal() {
  const [error, setError] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { portfolios } = useSelector((state: RootState) => state.portfolios);

  const router = useRouter();
  const { symbol } = router.query;

  const formik = useFormik({
    initialValues: {
      portfolioId: '',
      purchaseDate: {
        month: '',
        day: '',
        year: '',
      },
      quantity: '',
      purchasePrice: '',
    },
    validate: validateAddToPortfolio,
    onSubmit: async (values) => {
      if (!portfolio || !user) return;
      if (!values.portfolioId) {
        formik.setFieldError('portfolioId', 'Please select a portfolio.');
        return;
      }
      const dateObj = new Date(
        parseInt(values.purchaseDate.year),
        parseInt(values.purchaseDate.month) - 1,
        parseInt(values.purchaseDate.day)
      );
      if (isNaN(dateObj.getTime()) || dateObj > new Date()) {
        formik.setFieldError('purchaseDate', 'Please enter a valid date.');
      }
      setError(false);
      try {
        const { data } = await axios.post(
          `/api/users/${user.uid}/portfolios/${portfolio._id}`,
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
        setError(true);
      }
    },
  });

  const portfolio = portfolios.find(
    (portfolio) => portfolio._id === formik.values.portfolioId
  );

  return (
    <>
      <h2 className='mb-6 text-3xl font-semibold text-white'>
        Add To Portfolio
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-5'>
          <DropdownLarge
            selectedOption={
              portfolio ? { label: portfolio.name, value: portfolio._id } : null
            }
            setSelectedOption={(option) =>
              formik.setFieldValue('portfolioId', option.value)
            }
            options={portfolios.map((portfolio) => ({
              label: portfolio.name,
              value: portfolio._id,
            }))}
            placeholder='Select Portfolio'
            noOptionsMessage='You have no portfolios yet.'
          />
          {formik.errors.portfolioId && (
            <InputFeedback state='error'>
              {formik.errors.portfolioId}
            </InputFeedback>
          )}
        </div>
        <div className='mb-5'>
          <TextInput
            id='quantity'
            name='quantity'
            type='text'
            placeholder='Number of Shares'
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            bg='bg-grey3'
          />
          {formik.errors.quantity && formik.touched.quantity && (
            <InputFeedback state='error'>
              {formik.errors.quantity}
            </InputFeedback>
          )}
        </div>
        <div className='mb-6'>
          <TextInput
            id='purchasePrice'
            name='purchasePrice'
            type='text'
            placeholder='Price'
            value={formik.values.purchasePrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            bg='bg-grey3'
            classes='mb-6'
          />
          {formik.errors.purchasePrice && formik.touched.purchasePrice && (
            <InputFeedback state='error'>
              {formik.errors.purchasePrice}
            </InputFeedback>
          )}
        </div>
        <div className='mb-10'>
          <DateInput
            label='Purchase Date'
            value={formik.values.purchaseDate}
            setValue={(value) => formik.setFieldValue('purchaseDate', value)}
          />
          {formik.errors.purchaseDate && (
            <InputFeedback state='error'>
              {formik.errors.purchaseDate.month ||
                formik.errors.purchaseDate.day ||
                formik.errors.purchaseDate.year}
            </InputFeedback>
          )}
          {error && (
            <InputFeedback state='error'>
              There was an error adding this stock to your portfolio. Please try
              again later.
            </InputFeedback>
          )}
        </div>
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
