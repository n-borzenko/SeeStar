import type { FC } from "react";
import type { ShowCreditDetailed } from "types/credit";
import qs from "qs";
import { memo, useMemo } from "react";
import BlockHeader from "components/common/BlockHeader";
import EmptyState from "components/common/EmptyState";
import LinkGroup from "components/common/LinkGroup";
import useShowListParameter, { showListTypes } from "hooks/credit/useShowListParameter";
import EpisodeList from "./EpisodeList";
import SeasonList from "./SeasonList";

type ShowDetailsProps = {
  credit: ShowCreditDetailed;
};

const ShowDetails: FC<ShowDetailsProps> = ({ credit }) => {
  const showList = useShowListParameter();
  const links = useMemo(
    () =>
      showListTypes.map((type) => ({
        id: type,
        title: `${type.slice(0, 1).toUpperCase()}${type.slice(1)}`,
        href: `/credit/${credit.id}?${qs.stringify({ show_list: type })}`,
      })),
    [credit]
  );

  return (
    <div className="grow grid grid-rows-[auto_1fr]">
      <BlockHeader title="Credited in">
        <div className="w-1/2 max-w-[18rem]">
          <LinkGroup links={links} selectedId={showList} size="medium" wide />
        </div>
      </BlockHeader>
      {showList === "episodes" && (
        <>
          {credit.media.episodes.length > 0 ? (
            <EpisodeList episodes={credit.media.episodes} showId={credit.media.id} />
          ) : (
            <EmptyState message="No credits found" />
          )}
        </>
      )}
      {showList === "seasons" && (
        <>
          {credit.media.seasons.length > 0 ? (
            <SeasonList seasons={credit.media.seasons} showId={credit.media.id} />
          ) : (
            <EmptyState message="No credits found" />
          )}
        </>
      )}
    </div>
  );
};

export default memo(ShowDetails);
