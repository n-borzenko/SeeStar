import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import { memo } from "react";
import ButtonLikeLink from "components/common/ButtonLikeLink";

type SocialLinksProps = {
  movie: MovieExtended;
};

const SocialLinks: FC<SocialLinksProps> = ({ movie }) => {
  const className = "ml-2 sm:ml-4 lg:ml-8 first:ml-0";

  return (
    <div className="flex justify-between sm:justify-end">
      {movie.homepage && (
        <ButtonLikeLink
          ariaLabel="Movie homepage"
          href={movie.homepage}
          target="_blank"
          rel="noopener noreferrer"
          icon="home"
          iconSize="large"
          className={className}
        />
      )}
      {movie.externalIds.imdbId && (
        <ButtonLikeLink
          ariaLabel="Movie page on Imdb"
          href={`https://www.imdb.com/title/${movie.externalIds.imdbId}`}
          target="_blank"
          rel="noopener noreferrer"
          icon="imdb"
          iconSize="large"
          className={className}
        />
      )}
      {movie.externalIds.facebookId && (
        <ButtonLikeLink
          ariaLabel="Movie page on Facebook"
          href={`https://www.facebook.com/${movie.externalIds.facebookId}`}
          target="_blank"
          rel="noopener noreferrer"
          icon="facebook"
          iconSize="large"
          className={className}
        />
      )}
      {movie.externalIds.instagramId && (
        <ButtonLikeLink
          ariaLabel="Movie page on Instagram"
          href={`https://www.instagram.com/${movie.externalIds.instagramId}`}
          target="_blank"
          rel="noopener noreferrer"
          icon="instagram"
          iconSize="large"
          className={className}
        />
      )}
      {movie.externalIds.twitterId && (
        <ButtonLikeLink
          ariaLabel="Movie page on Twitter"
          href={`https://twitter.com/${movie.externalIds.twitterId}`}
          target="_blank"
          rel="noopener noreferrer"
          icon="twitter"
          iconSize="large"
          className={className}
        />
      )}
    </div>
  );
};

export default memo(SocialLinks);
