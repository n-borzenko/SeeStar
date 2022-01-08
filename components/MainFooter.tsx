import NextLink from "next/link";

const MainFooter = () => {
  return (
    <footer>
      <NextLink href="/about">
        <a className="link">About</a>
      </NextLink>
    </footer>
  );
};

export default MainFooter;
