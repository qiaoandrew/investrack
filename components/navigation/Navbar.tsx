import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { toggleMobileMenu } from '@/store/slices/mobileMenuSlice';
import logo from '@/public/logo.svg';

export default function Navbar() {
  const router = useRouter();
  const pathname = router.pathname;

  const dispatch: AppDispatch = useDispatch();
  const isMobileMenuOpen = useSelector(
    (state: RootState) => state.mobileMenu.isOpen
  );

  return (
    <nav className='fixed inset-x-5 top-10 z-40 flex h-10 items-center justify-between md:inset-x-8 xl:inset-x-9 xl:top-12'>
      <Link href='/' className='flex items-center gap-2'>
        <Image src={logo} alt='Investrack logo' className='w-6' />
        <p className='text-gradient text-xl font-semibold'>Investrack</p>
      </Link>
      {!['/log-in', '/sign-up'].includes(pathname) && (
        <button
          type='button'
          onClick={() => dispatch(toggleMobileMenu())}
          className='flex flex-col gap-[5px] xl:hidden'
        >
          <div
            className={`transition-300 bg-gradient h-1.5 w-6 rounded-full ${
              isMobileMenuOpen ? 'translate-x-3' : ''
            }`}
          />
          <div className='bg-gradient h-1.5 w-9 rounded-full' />
          <div
            className={`transition-300 bg-gradient h-1.5 w-6 self-end rounded-full ${
              isMobileMenuOpen ? '-translate-x-3' : ''
            }`}
          />
        </button>
      )}
    </nav>
  );
}
