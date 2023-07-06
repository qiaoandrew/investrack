import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import TextInput from '../UI/TextInput';
import Button from '../UI/Button';
import InputFeedback from '../UI/InputFeedback';

import { AppDispatch, RootState } from '@/store/store';
import { closeModal } from '@/store/slices/modalSlice';
import { addPortfolio } from '@/store/slices/portfoliosSlice';
import { validateName } from '@/util/formValidation';
import { Portfolio } from '@/interfaces/interfaces';

export default function CreatePortfolioModal() {
  const [error, setError] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: { name: '' },
    validate: validateName,
    onSubmit: async (values) => {
      if (!user) return;
      try {
        const { data } = await axios.post(`/api/users/${user.uid}/portfolios`, {
          name: values.name,
        });
        dispatch(addPortfolio(data as Portfolio));
        dispatch(closeModal());
      } catch (error) {
        console.error(error);
        setError(true);
      }
    },
  });

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Create Portfolio
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
            placeholder='Portfolio Name'
          />
          {formik.touched.name && formik.errors.name && (
            <InputFeedback state='error'>{formik.errors.name}</InputFeedback>
          )}
          {error && (
            <InputFeedback state='error'>
              Portfolio could not be created. Please try again later.
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
