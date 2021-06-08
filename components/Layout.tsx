import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { SITE_TITLE } from '@lib/constants';

type Props = {
  children: ReactNode;
  title: string;
};

export default function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>
          {SITE_TITLE} - {title}
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/supermetrics-icon.svg" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />
      <main>{children}</main>
      <Footer />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Roboto, Helvetica, Arial, sans-serif;
          color: #18191a;
        }

        * {
          margin: 0;
          box-sizing: border-box;
        }

        a {
          color: #18191a;
        }

        main {
          padding: 30px;
        }
      `}</style>
    </>
  );
}
