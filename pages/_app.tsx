import { AppProps } from 'next/app';
import { UserSessionProvider } from '@contexts/UserSessionContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserSessionProvider>
      <Component {...pageProps} />
    </UserSessionProvider>
  );
}
