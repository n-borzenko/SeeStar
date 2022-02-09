import { useCallback, memo, FormEvent, ChangeEvent, FC } from "react";
import Button from "components/Button";

type SearchFormProps = {
  onSubmit: () => void;
  onValueChanged: (query: string) => void;
};

const SearchForm: FC<SearchFormProps> = ({ onSubmit, onValueChanged }) => {
  const updateSearchText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onValueChanged(e.currentTarget.value.trim()),
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
        className="h-10 flex-grow text-lg pl-2 pr-12 md:pr-[10.5rem] border border-1 border-primary rounded-full text-primary"
        placeholder="You are looking for..."
        onChange={updateSearchText}
      ></input>
      <div className="absolute right-0 top-0 w-40 hidden md:block">
        <Button type="submit" size="large" wide>
          Search
        </Button>
      </div>
      <div className="absolute right-0 top-0 md:hidden">
        <Button type="submit" size="large" icon="search" />
      </div>
    </form>
  );
};

export default memo(SearchForm);
