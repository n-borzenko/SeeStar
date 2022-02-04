import { useState, useCallback, memo, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/router";
import qs from "qs";
import Button from "components/Button";

const SearchWidget = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const updateSearchText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value.trim()),
    []
  );

  const submitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      console.log("submitted", searchText);
      router.push(`/search?${qs.stringify({ query: searchText })}`);
    },
    [router, searchText]
  );

  return (
    <form onSubmit={submitForm} className="flex relative w-full">
      <input
        type="text"
        className="flex-grow text-lg pl-1 sm:pl-2 py-1.5 pr-[5.25rem] sm:pr-[5.5rem] md:pr-[10.5rem] border border-1 border-primary rounded-full text-primary"
        placeholder="You are looking for..."
        onChange={updateSearchText}
      ></input>
      <div className="absolute right-0 top-0 w-20 md:w-40">
        <Button type="submit" size="large" className="w-full">
          Search
        </Button>
      </div>
    </form>
  );
};

export default memo(SearchWidget);
