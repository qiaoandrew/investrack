import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { addWatchlist } from '@/store/slices/watchlistsSlice';
import { closeModal } from '@/store/slices/modalSlice';
import { useFormik } from 'formik';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';

export default function CreateWatchlistModal() {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      if (!user) return;
      const { data } = await axios.post('/api/watchlists', {
        uid: user.uid,
        name: values.name,
      });
      dispatch(addWatchlist(data));
      dispatch(closeModal());
    },
  });

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Create Watchlist
      </h2>
      <form onSubmit={formik.handleSubmit} className='grid gap-8'>
        <TextInput
          id='name'
          name='name'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder='Watchlist Name'
        />
        <Button type='submit' hierarchy='secondary' font='font-semibold'>
          Confirm
        </Button>
      </form>
    </>
  );
}
