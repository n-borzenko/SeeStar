import type { FC } from "react";
import type { SearchParameters } from "types/search";
import Link from "next/link";
import { useRouter } from "next/router";
import qs from "qs";
import { memo } from "react";
import { ButtonLink } from "components/common/Button";

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
        <Link
          href={`${router.pathname}?${qs.stringify({
            ...parameters,
            page: parameters.page - 1,
          })}`}
          passHref
        >
          <ButtonLink icon="arrow-left" variant="outlined" ariaLabel="Previous page" />
        </Link>
      ) : (
        <div className="w-8 h-8" />
      )}
      <span className="text-base font-normal text-primary text-center">
        {parameters.page} / {totalPages}
      </span>
      {isNextPageAvailable ? (
        <Link
          href={`${router.pathname}?${qs.stringify({
            ...parameters,
            page: parameters.page + 1,
          })}`}
          passHref
        >
          <ButtonLink icon="arrow-right" variant="outlined" ariaLabel="Next page" />
        </Link>
      ) : (
        <div className="w-8 h-8" />
      )}
    </div>
  );
};

export default memo(Pagination);
