import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { updateWatchlist } from '@/store/slices/watchlistsSlice';
import { closeModal } from '@/store/slices/modalSlice';
import { useFormik } from 'formik';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';

export default function RenameWatchlistModal() {
  const router = useRouter();
  const { watchlistId } = router.query;

  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      const { data } = await axios.patch(`/api/watchlists/${watchlistId}`, {
        name: values.name,
      });
      dispatch(updateWatchlist(data));
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
