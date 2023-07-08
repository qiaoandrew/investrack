import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Home,
  Repeat,
  List,
  Briefcase,
  Settings,
  LogOut,
  Plus,
  LogIn,
  UserPlus,
} from 'react-feather';

import { AppDispatch, RootState } from '@/store/store';
import { openModal } from '@/store/slices/modalSlice';
import { closeMobileMenu } from '@/store/slices/mobileMenuSlice';
import { logOutWatchlists } from '@/store/slices/watchlistsSlice';
import { logOutPortfolios } from '@/store/slices/portfoliosSlice';
import { logOut } from '@/util/auth';
import { COLORS } from '@/constants/colors';

export default function Menu() {
  const router = useRouter();
  const pathname = router.pathname;
  const { watchlistId, portfolioId } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const isMobileMenuOpen = useSelector(
    (state: RootState) => state.mobileMenu.isOpen
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { watchlists } = useSelector((state: RootState) => state.watchlists);
  const { portfolios } = useSelector((state: RootState) => state.portfolios);

  return (
    <nav
      className={`h-100dvh transition-300 fixed inset-0 z-30 flex w-full flex-col bg-grey4 px-5 pt-28 xl:w-[300px] ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'
      }`}
    >
      <div className='mb-3 grid gap-1'>
        <MenuItem
          label='Home'
          icon={
            <Home
              size={24}
              color={pathname === '/' ? COLORS.white : COLORS.grey1}
              className='transition-300'
            />
          }
          isActive={pathname === '/'}
          onClick={() => router.push('/')}
        />
        {/* <MenuItem
          label='Compare'
          icon={
            <Repeat
              size={24}
              color={pathname === '/compare' ? COLORS.white : COLORS.grey1}
              className='transition-300'
            />
          }
          isActive={pathname === '/compare'}
          onClick={() => router.push('/compare')}
        /> */}
      </div>
      <hr className='border-b-1 border-grey2' />
      <div className='relative flex flex-grow overflow-y-hidden'>
        <div className='no-scrollbar flex-grow overflow-y-scroll overscroll-contain pb-8 pt-6'>
          <div className='mb-2 flex items-center justify-between px-4'>
            <p className='text-sm text-grey1'>WATCHLISTS</p>
            <button
              onClick={() =>
                dispatch(
                  openModal(user ? 'createWatchlist' : 'accountRequired')
                )
              }
              className='transition-300 -m-1.5 rounded-full p-1.5 hover:bg-grey3'
            >
              <Plus size={24} color={COLORS.grey1} />
            </button>
          </div>
          <div className='mb-8 grid gap-1'>
            {watchlists.map((watchlist) => {
              const isActive =
                pathname.startsWith('/watchlist') &&
                watchlistId === watchlist._id;

              return (
                <MenuItem
                  key={watchlist._id}
                  label={watchlist.name}
                  icon={
                    <List
                      size={24}
                      color={isActive ? COLORS.white : COLORS.grey1}
                      className='transition-300'
                    />
                  }
                  isActive={isActive}
                  onClick={() => router.push(`/watchlists/${watchlist._id}`)}
                />
              );
            })}
          </div>
          <div className='mb-2 flex items-center justify-between px-4'>
            <p className='text-sm text-grey1'>PORTFOLIOS</p>
            <button
              onClick={() =>
                dispatch(
                  openModal(user ? 'createPortfolio' : 'accountRequired')
                )
              }
              className='transition-300 -m-1.5 rounded-full p-1.5 hover:bg-grey3'
            >
              <Plus size={24} color={COLORS.grey1} />
            </button>
          </div>
          <div className='grid gap-1'>
            {portfolios.map((portfolio) => {
              const isActive =
                pathname.startsWith('/portfolios') &&
                portfolioId === portfolio._id;

              return (
                <MenuItem
                  key={portfolio._id}
                  label={portfolio.name}
                  icon={
                    <Briefcase
                      size={24}
                      color={isActive ? COLORS.white : COLORS.grey1}
                      className='transition-300'
                    />
                  }
                  isActive={isActive}
                  onClick={() => router.push(`/portfolios/${portfolio._id}`)}
                />
              );
            })}
          </div>
        </div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-grey4 to-transparent' />
      </div>
      <hr className='border-b-1 mb-3 border-grey2' />
      <div className='mb-12 grid gap-1'>
        {user ? (
          <>
            <MenuItem
              label='Settings'
              icon={
                <Settings
                  size={24}
                  color={pathname === '/settings' ? COLORS.white : COLORS.grey1}
                  className='transition-300'
                />
              }
              isActive={pathname === '/settings'}
              onClick={() => router.push('/settings')}
            />
            <MenuItem
              label='Log Out'
              icon={<LogOut size={24} color={COLORS.grey1} />}
              isActive={false}
              onClick={() => {
                dispatch(logOutWatchlists());
                dispatch(logOutPortfolios());
                logOut();
              }}
            />
          </>
        ) : (
          <>
            <MenuItem
              label='Sign Up'
              icon={<UserPlus size={24} color={COLORS.grey1} />}
              isActive={false}
              onClick={() => router.push('/sign-up')}
            />
            <MenuItem
              label='Log In'
              icon={<LogIn size={24} color={COLORS.grey1} />}
              isActive={false}
              onClick={() => router.push('/log-in')}
            />
          </>
        )}
      </div>
    </nav>
  );
}

type MenuItemProps = {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  classes?: string;
};

function MenuItem({ label, icon, isActive, onClick, classes }: MenuItemProps) {
  const dispatch: AppDispatch = useDispatch();

  return (
    <button
      type='button'
      onClick={() => {
        onClick();
        dispatch(closeMobileMenu());
      }}
      className={`transition-300 group flex cursor-pointer items-center gap-3 rounded-md px-4 py-4 ${
        isActive ? 'bg-grey3' : 'hover:bg-grey3 hover:bg-opacity-70'
      } ${classes}`}
    >
      {icon}
      <span
        className={`transition-300 font-medium ${
          isActive ? 'text-white' : 'text-grey1'
        }`}
      >
        {label}
      </span>
    </button>
  );
}
