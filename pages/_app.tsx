import type { AppProps } from "next/app";
import type { FC } from "react";
import Head from "next/head";
import { SWRConfig } from "swr";
import MainHeader from "components/structure/MainHeader";
import MainFooter from "components/structure/MainFooter";
import defaultFetcher from "helpers/fetching/defaultFetcher";
import "../styles/index.css";

const swrOptions = {
  fetcher: defaultFetcher,
};

const MainApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>See Star</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <MainHeader />
        <SWRConfig value={swrOptions}>
          <main className="flex justify-center grow w-full mt-14 sm:mt-16">
            <div className="grow max-w-full xl:max-w-screen-xl p-4">
              <Component {...pageProps} />
            </div>
          </main>
        </SWRConfig>
        <MainFooter />
      </div>
    </>
  );
};

export default MainApp;
