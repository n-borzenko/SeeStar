import { FC } from "react";
import Image from "next/image";
import NextLink from "next/link";
import logoImage from "assets/logo.svg";

const MainHeader: FC = () => {
  return (
    <div className="flex justify-start items-center p-4 bg-primary shadow-bar">
      <NextLink href="/" passHref>
        <a className="leading-0 flex items-center focus:rounded-lg">
          <Image
            src={logoImage}
            alt="Logo"
            layout="fixed"
            priority
            quality="100"
            width="40"
            height="40"
          />
          <h4 className="text-white ml-4">See Star</h4>
        </a>
      </NextLink>
    </div>
  );
};

export default MainHeader;
