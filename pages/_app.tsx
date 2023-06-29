import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import ReduxProvider from '@/components/redux/ReduxProvider';
import Navbar from '@/components/navigation/Navbar';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Modal from '@/components/modal/ModalContainer';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <ReduxProvider>
      <Navbar />
      {['/log-in', '/sign-up'].includes(pathname) ? (
        <Component {...pageProps} />
      ) : (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      )}
      <Modal />
    </ReduxProvider>
  );
}
