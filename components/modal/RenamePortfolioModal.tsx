import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import TextInput from '@/components/UI/TextInput';
import Button from '@/components/UI/Button';
import InputFeedback from '@/components/UI/InputFeedback';
import LoadingSpinner from '@/components/UI/LoadingSpinner';

import { AppDispatch, RootState } from '@/store/store';
import { updatePortfolio } from '@/store/slices/portfoliosSlice';
import { closeModal } from '@/store/slices/modalSlice';
import { validateName } from '@/util/formValidation';
import { Portfolio } from '@/types/types';

export default function RenamePortfolioModal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { portfolioId } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: { name: '' },
    validate: validateName,
    onSubmit: async (values) => {
      if (!user) return null;
      setLoading(true);
      setError(false);
      try {
        const { data } = await axios.patch(
          `/api/users/${user.uid}/portfolios/${portfolioId}`,
          { name: values.name }
        );
        dispatch(updatePortfolio(data as Portfolio));
        dispatch(closeModal());
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className={loading ? 'opacity-0' : 'opacity-100'}>
        <h2 className='mb-4 text-3xl font-semibold text-white'>
          Rename Portfolio
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-8'>
            <TextInput
              id='name'
              name='name'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder='New Portfolio Name'
            />
            {formik.touched.name && formik.errors.name && (
              <InputFeedback state='error'>{formik.errors.name}</InputFeedback>
            )}
            {error && (
              <InputFeedback state='error'>
                There was an error renaming your portfolio. Please try again.
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
      </div>
      {loading && (
        <LoadingSpinner classes='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
      )}
    </>
  );
}
