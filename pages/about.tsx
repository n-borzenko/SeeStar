import type { NextPage } from "next";
import Image from "next/image";
import { memo } from "react";
import TitledPageContainer from "components/common/TitledPageContainer";

const AboutPage: NextPage = () => {
  return (
    <TitledPageContainer title="SeeStar • About">
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
      <div className="mt-8">
        <h4 className="mb-4">Author</h4>
        <p className="text-base font-normal">Application is created by Natalia Borzenko.</p>
        <p className="mt-2">
          You can contact me by email:{" "}
          <a className="link" href="mailto:n.borzenko93@gmail.com">
            n.borzenko93@gmail.com
          </a>
        </p>
        <p>
          or check out my{" "}
          <a
            className="link"
            href="https://github.com/n-borzenko"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github profile
          </a>
          .
        </p>
      </div>
    </TitledPageContainer>
  );
};

export default memo(AboutPage);
