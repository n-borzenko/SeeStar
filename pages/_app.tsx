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
      <div className="flex flex-col min-h-screen">
        <MainHeader />
        <main className="flex justify-center grow w-full mt-14 sm:mt-16">
          <div className="grow xl:max-w-screen-xl p-4">
            <Component {...pageProps} />
          </div>
        </main>
        <MainFooter />
      </div>
    </>
  );
};

export default MainApp;
