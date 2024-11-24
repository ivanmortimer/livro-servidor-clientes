import 'bootstrap/dist/css/bootstrap.css'
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  <>
    <Head>
      <meta name='viewport' content='width=device-width, initialscale=1' />
    </Head>
  </>
  return <Component {...pageProps} />;
}
