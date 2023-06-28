import Image from 'next/image';
import logo from '@/public/logo.svg';

export default function Header() {
  return (
    <nav className='fixed inset-x-5 top-10 z-40 flex h-10 items-center justify-between md:inset-x-8 xl:inset-x-9 xl:top-12'>
      <div className='gap-2 flex items-center'>
        <Image src={logo} alt='Investrack logo' className='w-5' />
        <p className='text-xl text-gradient font-semibold'>Investrack</p>
      </div>
    </nav>
  );
}
