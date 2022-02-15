import NextLink from "next/link";
import { memo } from "react";

const MainFooter = () => {
  return (
    <footer>
      <NextLink href="/about">
        <a className="link">About</a>
      </NextLink>
    </footer>
  );
};

export default memo(MainFooter);
