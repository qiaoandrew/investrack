import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { closeModal } from '@/store/slices/modalSlice';
import Button from '../UI/Button';

export default function DeletePortfolioModal() {
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Delete Portfolio
      </h2>
      <p className='mb-8 text-blue1 md:text-lg'>
        Are you sure you want to delete this portfolio?
      </p>
      <div className='grid gap-4'>
        <Button
          type='button'
          onClick={() => {}}
          hierarchy='secondary'
          font='font-semibold'
        >
          Confirm
        </Button>
        <Button
          type='button'
          onClick={() => dispatch(closeModal())}
          hierarchy='tertiary'
          font='font-semibold'
        >
          Cancel
        </Button>
      </div>
    </>
  );
}
