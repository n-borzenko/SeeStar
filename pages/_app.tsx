import type { AppProps } from "next/app";
import type { FC } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import ConfigurationLoader from "components/common/ConfigurationLoader";
import MainHeader from "components/structure/MainHeader";
import MainFooter from "components/structure/MainFooter";
import store from "store/index";
import "../styles/index.css";

const MainApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>See Star</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <MainHeader />
        <Provider store={store}>
          <main className="flex justify-center grow w-full mt-14 sm:mt-16">
            <div className="grow max-w-full xl:max-w-screen-xl p-4">
              <ConfigurationLoader>
                <Component {...pageProps} />
              </ConfigurationLoader>
            </div>
          </main>
        </Provider>
        <MainFooter />
      </div>
    </>
  );
};

export default MainApp;
