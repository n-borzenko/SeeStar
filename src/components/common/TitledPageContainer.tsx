import type { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { memo } from "react";

type TitledPageContainerProps = {
  title: string;
};

const TitledPageContainer: FC<PropsWithChildren<TitledPageContainerProps>> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
};

export default memo(TitledPageContainer);
