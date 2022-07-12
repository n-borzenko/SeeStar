import type { FC } from "react";
import type { TrendingData } from "types/trending";
import { memo } from "react";
import MediaLandscapeCard from "components/cards/MediaLandscapeCard";
import PaginationContainer from "components/common/PaginationContainer";
import { MediaTypes } from "types/mediaTypes";

type TrendingResultsProps = {
  data: TrendingData;
};

const TrendingResults: FC<TrendingResultsProps> = ({ data }) => {
  return (
    <PaginationContainer
      items={data.results}
      page={data.page}
      numberOfPages={data.totalPages}
      numberOfResults={data.totalResults}
      hasRemotePagination
    >
      {(results) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          {results.map((item) => (
            <div key={item.id}>
              {item.mediaType === MediaTypes.Movie && (
                <MediaLandscapeCard
                  href={`/movie/${item.id}`}
                  posterPath={item.posterPath}
                  mediaType={item.mediaType}
                  title={item.title}
                  startDate={item.releaseDate}
                  voteAverage={item.voteAverage}
                  genreIds={item.genreIds}
                  overview={item.overview}
                />
              )}
              {item.mediaType === MediaTypes.Show && (
                <MediaLandscapeCard
                  href={`/show/${item.id}`}
                  posterPath={item.posterPath}
                  mediaType={item.mediaType}
                  title={item.name}
                  startDate={item.firstAirDate}
                  voteAverage={item.voteAverage}
                  genreIds={item.genreIds}
                  overview={item.overview}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </PaginationContainer>
  );
};

export default memo(TrendingResults);
