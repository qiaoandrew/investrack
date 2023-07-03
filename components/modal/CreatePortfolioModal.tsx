import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import TextInput from '../UI/TextInput';
import Button from '../UI/Button';

import { AppDispatch, RootState } from '@/store/store';
import { closeModal } from '@/store/slices/modalSlice';
import { addPortfolio } from '@/store/slices/portfoliosSlice';
import { Portfolio } from '@/interfaces/interfaces';

export default function CreatePortfolioModal() {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: async (values) => {
      if (!user) return;
      const { data } = await axios.post(`/api/users/${user.uid}/portfolios`, {
        name: values.name,
      });
      dispatch(addPortfolio(data as Portfolio));
      dispatch(closeModal());
    },
  });

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Create Portfolio
      </h2>
      <form onSubmit={formik.handleSubmit} className='grid gap-8'>
        <TextInput
          id='name'
          name='name'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder='Portfolio Name'
        />
        <Button type='submit' hierarchy='secondary' font='font-semibold'>
          Confirm
        </Button>
      </form>
    </>
  );
}
