import { useDispatch, useSelector } from 'react-redux';
import { XCircle } from 'react-feather';

import AccountRequiredModal from './AccountRequiredModal';
import AddToPortfolioModal from './AddToPortfolioModal';
import AddToWatchlistModal from './AddToWatchlistModal';
import CreatePortfolioModal from './CreatePortfolioModal';
import CreateWatchlistModal from './CreateWatchlistModal';
import DeletePortfolioModal from './DeletePortfolioModal';
import DeleteWatchlistModal from './DeleteWatchlistModal';
import RenameWatchlistModal from './RenameWatchlistModal';
import RenamePortfolioModal from './RenamePortfolioModal';

import { AppDispatch, RootState } from '@/store/store';
import { closeModal } from '@/store/slices/modalSlice';
import { COLORS } from '@/constants/colors';

export default function Modal() {
  const dispatch: AppDispatch = useDispatch();
  const modalContent = useSelector((state: RootState) => state.modal.content);

  return (
    <div
      onClick={() => dispatch(closeModal())}
      className={`transition-300 fixed inset-0 z-50 bg-black ${
        modalContent
          ? 'pointer-events-auto bg-opacity-80'
          : 'pointer-events-none bg-opacity-0'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grey3 px-5 py-6 md:px-6 md:py-7 ${
          modalContent ? 'block' : 'hidden'
        } ${
          modalContent === 'addToPortfolio'
            ? 'w-[min(480px,100%-40px)]'
            : 'w-[min(440px,100%-40px)]'
        }`}
      >
        {modalContent === 'createWatchlist' && <CreateWatchlistModal />}
        {modalContent === 'createPortfolio' && <CreatePortfolioModal />}
        {modalContent === 'accountRequired' && <AccountRequiredModal />}
        {modalContent === 'deleteWatchlist' && <DeleteWatchlistModal />}
        {modalContent === 'deletePortfolio' && <DeletePortfolioModal />}
        {modalContent === 'addToWatchlist' && <AddToWatchlistModal />}
        {modalContent === 'addToPortfolio' && <AddToPortfolioModal />}
        {modalContent === 'renameWatchlist' && <RenameWatchlistModal />}
        {modalContent === 'renamePortfolio' && <RenamePortfolioModal />}

        <XCircle
          size={32}
          fill={COLORS.blue1}
          stroke={COLORS.grey3}
          onClick={() => dispatch(closeModal())}
          className='transition-300 absolute right-4 top-4 cursor-pointer hover:scale-105'
        />
      </div>
    </div>
  );
}
