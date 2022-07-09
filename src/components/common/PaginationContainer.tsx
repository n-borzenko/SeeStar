import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useMemo } from "react";
import { ButtonLink } from "components/common/Button";

const pageSize = 20;

type PaginationContainerProps<T> = {
  items: T[];
  page: number;
  numberOfResults?: number;
  numberOfPages?: number;
  hasRemotePagination?: boolean;
  children: (items: T[]) => ReactNode;
};

// number of results and pages are expected for items requested by page,
// otherwise it is calculated from items length
const PaginationContainer = <T extends any>({
  items,
  page,
  numberOfPages,
  numberOfResults,
  hasRemotePagination = false,
  children,
}: PaginationContainerProps<T>) => {
  const router = useRouter();
  const visibleItems = useMemo(
    () => (hasRemotePagination ? items : items.slice((page - 1) * pageSize, page * pageSize)),
    [page, items, hasRemotePagination]
  );

  const totalResults = numberOfResults ?? items.length;
  const totalPages = numberOfPages ?? Math.ceil(totalResults / pageSize);
  const isNextPageAvailable = page > 0 && page < totalPages;
  const isPreviousPageAvailable = page > 1;

  return (
    <div className="grid grid-rows-[1fr_auto] grid-cols-5 gap-x-2 gap-y-4 lg:gap-8">
      <div className="col-span-full">{children(visibleItems)}</div>

      {totalResults > 0 && (
        <>
          <div className="col-span-3 self-center">
            {totalPages > 1 && (
              <div className="max-w-[12rem] flex justify-between items-center">
                {isPreviousPageAvailable ? (
                  <Link
                    href={{
                      pathname: router.pathname,
                      query: { ...router.query, page: page - 1 },
                    }}
                    passHref
                  >
                    <ButtonLink icon="arrow-left" variant="outlined" ariaLabel="Previous page" />
                  </Link>
                ) : (
                  <ButtonLink icon="arrow-left" variant="outlined" disabled ariaHidden />
                )}
                <span className="text-base font-normal text-primary text-center mx-2">
                  {page} / {totalPages}
                </span>
                {isNextPageAvailable ? (
                  <Link
                    href={{
                      pathname: router.pathname,
                      query: { ...router.query, page: page + 1 },
                    }}
                    passHref
                  >
                    <ButtonLink icon="arrow-right" variant="outlined" ariaLabel="Next page" />
                  </Link>
                ) : (
                  <ButtonLink icon="arrow-right" variant="outlined" disabled ariaHidden />
                )}
              </div>
            )}
          </div>

          <div className="col-span-2 justify-self-end self-center">
            <p className="text-lg font-medium text-primary text-right">{totalResults} results</p>
          </div>
        </>
      )}
    </div>
  );
};

// Recommended way to resolve type issue with hoc return types
// https://github.com/microsoft/TypeScript/issues/30650
export default memo(PaginationContainer) as typeof PaginationContainer;
