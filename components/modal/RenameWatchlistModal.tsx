import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import TextInput from '../UI/TextInput';
import Button from '../UI/Button';

import { AppDispatch, RootState } from '@/store/store';
import { updateWatchlist } from '@/store/slices/watchlistsSlice';
import { closeModal } from '@/store/slices/modalSlice';
import { Watchlist } from '@/interfaces/interfaces';

export default function RenameWatchlistModal() {
  const router = useRouter();
  const { watchlistId } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: async (values) => {
      if (!user) return null;
      const { data } = await axios.patch(
        `/api/users/${user.uid}/watchlists/${watchlistId}`,
        { name: values.name }
      );
      dispatch(updateWatchlist(data as Watchlist));
      dispatch(closeModal());
    },
  });

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Rename Watchlist
      </h2>
      <form onSubmit={formik.handleSubmit} className='grid gap-8'>
        <TextInput
          id='name'
          name='name'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder='New Watchlist Name'
        />
        <Button type='submit' hierarchy='secondary' font='font-semibold'>
          Confirm
        </Button>
      </form>
    </>
  );
}
