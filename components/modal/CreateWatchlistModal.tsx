import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { closeModal } from '@/store/slices/modalSlice';
import { useFormik } from 'formik';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';

export default function CreateWatchlistModal() {
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      dispatch(closeModal());
    },
  });

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Create Watchlist
      </h2>
      <form className='grid gap-8'>
        <TextInput
          id='name'
          name='name'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder='Watchlist Name'
        />
        <Button
          type='button'
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
