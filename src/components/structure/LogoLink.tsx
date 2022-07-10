import type { FC, MouseEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type LogoLinkProps = {
  size: "medium" | "large";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const LogoLink: FC<LogoLinkProps> = ({ onClick, size }) => {
  return (
    <Link href="/">
      <a
        className="leading-0 flex items-center focus:rounded-full"
        onClick={onClick}
        aria-label="See star home page"
      >
        <Image
          src="/assets/logo.svg"
          priority
          alt="Logo"
          layout="fixed"
          quality="100"
          width={size === "large" ? 40 : 28}
          height={size === "large" ? 40 : 28}
        />
        <span
          className={`text-white font-semibold ${
            size === "large" ? "text-3xl ml-4" : "text-xl ml-2"
          }`}
        >
          SeeStar
        </span>
      </a>
    </Link>
  );
};

export default memo(LogoLink);
