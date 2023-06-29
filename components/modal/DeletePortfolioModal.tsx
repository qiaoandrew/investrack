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
      <p className='mb-6 text-blue1 md:mb-8'>
        Are you sure you want to delete this portfolio?
      </p>
      <div className='flex flex-col gap-5'>
        <Button
          type='button'
          onClick={() => {}}
          hierarchy='secondary'
          font='font-semibold'
          classes='w-full'
        >
          Confirm
        </Button>
        <Button
          type='button'
          onClick={() => dispatch(closeModal())}
          hierarchy='tertiary'
          font='font-semibold'
          classes='w-full'
        >
          Cancel
        </Button>
      </div>
    </>
  );
}
