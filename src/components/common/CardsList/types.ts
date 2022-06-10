import type { ReactNode } from "react";

export type CustomCardsListProps<T> = {
  items: T[];
  getKey: (item: T) => string | number;
  children: (item: T) => ReactNode;
  limited?: boolean;
};
