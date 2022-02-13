import { memo } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import qs from "qs";
import { useAppSelector } from "store/hooks";
import ButtonLikeLink from "components/ButtonLikeLink";

const Pagination = () => {
  const router = useRouter();
  const searchState = useAppSelector((state) => state.search);

  const isNextPageAvailable =
    searchState.parameters.page > 0 && searchState.parameters.page < searchState.data.totalPages;
  const isPreviousPageAvailable = searchState.parameters.page > 1;

  return (
    <div className="max-w-xs flex justify-between items-center">
      {isPreviousPageAvailable ? (
        <NextLink
          href={`${router.pathname}?${qs.stringify({
            ...searchState.parameters,
            page: searchState.parameters.page - 1,
          })}`}
          passHref
        >
          <ButtonLikeLink
            icon="arrow-left"
            variant="outlined"
            size="large"
            ariaLabel="Previous page"
          />
        </NextLink>
      ) : (
        <div className="w-10 h-10" />
      )}
      <span className="text text-primary text-center">
        {searchState.parameters.page} / {searchState.data.totalPages}
      </span>
      {isNextPageAvailable ? (
        <NextLink
          href={`${router.pathname}?${qs.stringify({
            ...searchState.parameters,
            page: searchState.parameters.page + 1,
          })}`}
          passHref
        >
          <ButtonLikeLink
            icon="arrow-right"
            variant="outlined"
            size="large"
            ariaLabel="Next page"
          />
        </NextLink>
      ) : (
        <div className="w-10 h-10" />
      )}
    </div>
  );
};

export default memo(Pagination);
