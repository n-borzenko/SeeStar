import Link from "next/link";
import { memo } from "react";

const MainFooter = () => {
  return (
    <footer>
      <Link href="/about">
        <a className="link">About</a>
      </Link>
    </footer>
  );
};

export default memo(MainFooter);
