import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { closeModal } from '@/store/slices/modalSlice';
import Button from '../UI/Button';

export default function AccountRequiredModal() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (path: string) => {
    dispatch(closeModal());
    router.push(path);
  };

  return (
    <>
      <h2 className='mb-4 text-3xl font-semibold text-white'>
        Account Required
      </h2>
      <p className='mb-8 text-blue1 md:text-lg'>
        Create an account to create watchlists.
      </p>
      <div className='flex flex-col gap-4'>
        <Button
          type='button'
          onClick={() => handleClick('/sign-up')}
          hierarchy='secondary'
          font='font-semibold'
        >
          Sign Up
        </Button>
        <Button
          type='button'
          onClick={() => handleClick('/log-in')}
          hierarchy='tertiary'
          font='font-semibold'
        >
          Log In
        </Button>
      </div>
    </>
  );
}
