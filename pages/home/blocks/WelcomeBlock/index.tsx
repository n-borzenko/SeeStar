import { memo } from "react";
import SearchWidget from "./SearchWidget";

const WelcomeBlock = () => {
  return (
    <div className="-mx-4">
      <div
        className="flex relative h-[20rem] overflow-hidden p-4"
        style={{
          background:
            "radial-gradient(80% 60% at 0% 35%, white, white 99.99%, rgb(var(--color-primary) / 0.2) 100%)",
        }}
      >
        <div className="flex h-full sm:h-3/4 basis-full sm:basis-8/12 flex-col justify-between sm:justify-around">
          <h1 className="w-4/6 sm:w-full variant-h3 md:variant-h2 mt-11 sm:mt-0">
            Explore shows, movies, people
          </h1>
          <SearchWidget />
        </div>
        <div className="absolute top-[5%] left-[80%] h-4/6 w-full bg-contain bg-left-top bg-no-repeat bg-[url('/assets/camera.svg')]" />
      </div>
      <div className="flex h-[2rem] w-full">
        <div
          className="h-full basis-1/2"
          style={{
            background:
              "radial-gradient(55.8% 90% at 50% 10%, rgb(var(--color-primary) / 0.2) 0%, rgb(var(--color-primary) / 0.2) 99.99%, transparent 100%)",
          }}
        />
        <div
          className="h-full basis-1/2"
          style={{
            background:
              "radial-gradient(55.9% 90% at 50% 90%, transparent 0%, transparent 99.99%, rgb(var(--color-primary) / 0.2) 100%)",
          }}
        />
      </div>
    </div>
  );
};

export default memo(WelcomeBlock);
