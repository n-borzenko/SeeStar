import type { FC } from "react";
import type { ExternalIds } from "types/externalIds";
import { memo } from "react";
import { ButtonLink } from "components/common/Button";

type SocialLinksProps = {
  externalIds: ExternalIds;
  homepage?: string | null;
  label: string;
};

const SocialLinks: FC<SocialLinksProps> = ({ externalIds, homepage, label }) => {
  const className = "mx-auto sm:mr-0 sm:ml-4 lg:ml-8 first:sm:ml-0";

  return (
    <div className="flex justify-between sm:justify-end">
      {homepage && (
        <ButtonLink
          ariaLabel={`${label} homepage`}
          href={homepage}
          target="_blank"
          rel="noopener noreferrer"
          icon="home"
          iconSize="big"
          className={className}
        />
      )}
      {externalIds.imdbId && (
        <ButtonLink
          ariaLabel={`${label} page on Imdb`}
          href={`https://www.imdb.com/title/${externalIds.imdbId}`}
          target="_blank"
          rel="noopener noreferrer"
          icon="imdb"
          iconSize="big"
          className={className}
        />
      )}
      {externalIds.facebookId && (
        <ButtonLink
          ariaLabel={`${label} page on Facebook`}
          href={`https://www.facebook.com/${externalIds.facebookId}`}
          target="_blank"
          rel="noopener noreferrer"
          icon="facebook"
          iconSize="big"
          className={className}
        />
      )}
      {externalIds.instagramId && (
        <ButtonLink
          ariaLabel={`${label} page on Instagram`}
          href={`https://www.instagram.com/${externalIds.instagramId}`}
          target="_blank"
          rel="noopener noreferrer"
          icon="instagram"
          iconSize="big"
          className={className}
        />
      )}
      {externalIds.twitterId && (
        <ButtonLink
          ariaLabel={`${label} page on Twitter`}
          href={`https://twitter.com/${externalIds.twitterId}`}
          target="_blank"
          rel="noopener noreferrer"
          icon="twitter"
          iconSize="big"
          className={className}
        />
      )}
    </div>
  );
};

export default memo(SocialLinks);
