import type { FC } from "react";
import type { SearchParameters } from "types/search";
import NextLink from "next/link";
import { useRouter } from "next/router";
import qs from "qs";
import { memo } from "react";
import ButtonLikeLink from "components/common/ButtonLikeLink";

type PaginationProps = {
  parameters: SearchParameters;
  totalPages: number;
};

const Pagination: FC<PaginationProps> = ({ parameters, totalPages }) => {
  const router = useRouter();
  const isNextPageAvailable = parameters.page > 0 && parameters.page < totalPages;
  const isPreviousPageAvailable = parameters.page > 1;

  return (
    <div className="max-w-[12rem] flex justify-between items-center">
      {isPreviousPageAvailable ? (
        <NextLink
          href={`${router.pathname}?${qs.stringify({
            ...parameters,
            page: parameters.page - 1,
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
      <span className="text-base font-normal text-primary text-center">
        {parameters.page} / {totalPages}
      </span>
      {isNextPageAvailable ? (
        <NextLink
          href={`${router.pathname}?${qs.stringify({
            ...parameters,
            page: parameters.page + 1,
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
