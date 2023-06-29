import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ReduxProvider from '@/components/redux/ReduxProvider';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <ReduxProvider>
      {['/log-in', '/sign-up'].includes(pathname) ? (
        <Component {...pageProps} />
      ) : (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      )}
    </ReduxProvider>
  );
}
