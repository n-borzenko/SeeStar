import type { FormEvent, ChangeEvent, FC } from "react";
import { memo, useCallback } from "react";
import Button from "components/Button";

type SearchFormProps = {
  value?: string;
  onSubmit: () => void;
  onValueChanged: (query: string) => void;
};

const SearchForm: FC<SearchFormProps> = ({ value = "", onSubmit, onValueChanged }) => {
  const updateSearchText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onValueChanged(e.currentTarget.value),
    [onValueChanged]
  );

  const submitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  return (
    <form onSubmit={submitForm} className="flex relative w-full">
      <input
        type="text"
        className="h-10 flex-grow max-w-full text-lg font-normal text-primary pl-2 pr-12 md:pr-[10.5rem] border border-1 border-primary rounded-full"
        placeholder="You are looking for..."
        value={value}
        onChange={updateSearchText}
      ></input>
      <div className="absolute right-0 top-0 w-40 hidden md:block">
        <Button type="submit" size="large" wide>
          Search
        </Button>
      </div>
      <div className="absolute right-0 top-0 md:hidden">
        <Button type="submit" size="large" icon="search" ariaLabel="Search" />
      </div>
    </form>
  );
};

export default memo(SearchForm);
