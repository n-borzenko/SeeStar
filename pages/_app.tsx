import type { AppProps } from "next/app";
import type { FC } from "react";
import Head from "next/head";
import { SWRConfig } from "swr";
import Breadcrumbs from "components/structure/Breadcrumbs";
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
      <SWRConfig value={swrOptions}>
        <div className="flex flex-col min-h-screen">
          <MainHeader />
          <main className="flex justify-center grow w-full mt-14 sm:mt-16">
            <div className="grow flex flex-col max-w-full xl:max-w-screen-xl p-4 sm:p-8">
              <Breadcrumbs />
              <div className="grow">
                <Component {...pageProps} />
              </div>
            </div>
          </main>
          <MainFooter />
        </div>
      </SWRConfig>
    </>
  );
};

export default MainApp;
