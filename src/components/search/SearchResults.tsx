import type { FC } from "react";
import type { SearchData } from "types/search";
import { memo } from "react";
import MediaLandscapeCard from "components/cards/MediaLandscapeCard";
import PersonLandscapeCard from "components/cards/PersonLandscapeCard";
import PaginationContainer from "components/common/PaginationContainer";
import getImageSize from "helpers/getImageSize";
import { getGenderAndDepartment } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

const posterSizeName = "smallPortrait";

type SearchResultsProps = {
  data: SearchData;
};

const SearchResults: FC<SearchResultsProps> = ({ data }) => {
  const maxItemHeight = getImageSize(posterSizeName).height;

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
            <div key={item.id} style={{ maxHeight: maxItemHeight }}>
              {item.mediaType === MediaTypes.Movie && (
                <MediaLandscapeCard
                  href={`/movie/${item.id}`}
                  cardSize="small"
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
                  cardSize="small"
                  posterPath={item.posterPath}
                  mediaType={item.mediaType}
                  title={item.name}
                  startDate={item.firstAirDate}
                  voteAverage={item.voteAverage}
                  genreIds={item.genreIds}
                  overview={item.overview}
                />
              )}
              {item.mediaType === MediaTypes.Person && (
                <PersonLandscapeCard
                  href={`/person/${item.id}`}
                  cardSize="small"
                  posterPath={item.profilePath}
                  title={item.name}
                  infoText={getGenderAndDepartment(item.gender, item.knownForDepartment)}
                  knownFor={item.knownFor}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </PaginationContainer>
  );
};

export default memo(SearchResults);
