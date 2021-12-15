import type { NextPage } from "next";
import NextLink from "next/link";

const IndexPage: NextPage = () => {
  return (
    <>
      <footer>
        <NextLink href="/about">
          <a className="link">About</a>
        </NextLink>
      </footer>
    </>
  );
};

export default IndexPage;
