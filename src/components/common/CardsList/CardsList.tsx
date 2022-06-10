import type { CustomCardsListProps } from "./types";
import CustomCardsList from "./CustomCardsList";

type CardsListItem = {
  id: string | number;
};

type CardsListProps<T> = Omit<CustomCardsListProps<T>, "getKey">;

const getKey = (item: CardsListItem) => {
  return item.id;
};

const CardsList = <T extends CardsListItem>({
  items,
  children,
  limited = false,
}: CardsListProps<T>) => {
  return (
    <CustomCardsList items={items} getKey={getKey} limited={limited}>
      {children}
    </CustomCardsList>
  );
};

export default CardsList;
