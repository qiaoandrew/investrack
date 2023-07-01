import axios from 'axios';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, AppDispatch, RootState } from '@/store/store';
import { setWatchlists } from '@/store/slices/watchlistsSlice';
import { setPortfolios } from '@/store/slices/portfoliosSlice';
import { setUser } from '@/store/slices/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <StateWrapper>{children}</StateWrapper>
    </Provider>
  );
}

function StateWrapper({ children }: { children: React.ReactNode }) {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(
        user
          ? setUser({ uid: user.uid, email: user.email as string })
          : setUser(null)
      );
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const fetchWatchlists = async () => {
      if (!user) return;
      const { data } = await axios.get('/api/watchlists', {
        params: { uid: user.uid },
      });
      dispatch(setWatchlists(data));
    };

    const fetchPortfolios = async () => {
      if (!user) return;
      const { data } = await axios.get('/api/portfolios', {
        params: { uid: user.uid },
      });
      dispatch(setPortfolios(data));
    };

    fetchWatchlists();
    fetchPortfolios();
  }, [user, dispatch]);

  return <>{children}</>;
}
