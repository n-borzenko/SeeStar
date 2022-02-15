import type { NextPage } from "next";
import Image from "next/image";
import { memo } from "react";

const AboutPage: NextPage = () => {
  return (
    <>
      <div>
        <h4 className="mb-4">Data and images provider</h4>
        <Image
          src="/assets/tmdb-logo.svg"
          alt="The Movie Database logo"
          layout="fixed"
          quality="100"
          width="200"
          height="15"
        />
        <p className="mt-1 text-base font-normal">
          This product uses the{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            TMDB API
          </a>{" "}
          but is not endorsed or certified by TMDB.
        </p>
      </div>
    </>
  );
};

export default memo(AboutPage);
