import type { ReactNode } from "react";
import type { AnyCredit } from "types/credit";
import { memo } from "react";
import { CustomCardsList } from "components/common/CardsList";
import { MediaTypes } from "types/mediaTypes";
import MovieCreditCard from "./MovieCreditCard";
import ShowCreditCard from "./ShowCreditCard";

type PersonCreditListProps<T> = {
  items: T[];
  children: (item: T) => ReactNode;
};

const getKey = (item: AnyCredit) => {
  return item.creditId;
};

const PersonCreditList = <T extends AnyCredit>({ items, children }: PersonCreditListProps<T>) => {
  return (
    <CustomCardsList items={items} getKey={getKey}>
      {(item) => (
        <>
          {item.mediaType === MediaTypes.Movie && (
            <MovieCreditCard movie={item}>{children(item)}</MovieCreditCard>
          )}
          {item.mediaType === MediaTypes.Show && (
            <ShowCreditCard show={item}>{children(item)}</ShowCreditCard>
          )}
        </>
      )}
    </CustomCardsList>
  );
};

// Recommended way to resolve type issue with hoc return types
// https://github.com/microsoft/TypeScript/issues/30650
export default memo(PersonCreditList) as typeof PersonCreditList;
