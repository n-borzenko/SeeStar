import { AppProps } from "next/app";
import Head from "next/head";
import MainHeader from "components/MainHeader";
import MainFooter from "components/MainFooter";
import "../styles/index.css";

const MainApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>See Star</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <div>
        <MainHeader />
        <Component {...pageProps} />
        <MainFooter />
      </div>
    </>
  );
};

export default MainApp;
