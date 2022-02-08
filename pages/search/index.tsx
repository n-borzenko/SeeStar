import type { NextPage } from "next";
import SearchForm from "components/SearchForm";

const SearchPage: NextPage = () => {
  return (
    <>
      <h1 className="variant-h3 md:variant-h2">Search for movies, shows, people</h1>
      <div className="flex flex-wrap mt-6">
        <div className="basis-full sm:basis-1/2 md:basis-7/12">
          <SearchForm />
        </div>
        <div className="basis-full sm:basis-1/2 md:basis-5/12">jhkl</div>
      </div>
    </>
  );
};

export default SearchPage;
