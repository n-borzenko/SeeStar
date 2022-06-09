import type { FC } from "react";
import type { MovieCreditDetailed, ShowCreditDetailed } from "types/credit";
import { memo } from "react";
import { CreditTypes } from "types/creditTypes";
import { MediaTypes } from "types/mediaTypes";

type CreditDescriptionProps = {
  credit: MovieCreditDetailed | ShowCreditDetailed;
};

const CreditDescription: FC<CreditDescriptionProps> = ({ credit }) => {
  return (
    <div>
      <h1 className="inline text-3xl md:text-4xl font-black">
        {credit.person.name} in{" "}
        {credit.mediaType === MediaTypes.Movie ? credit.media.title : credit.media.name}
      </h1>
      <div className="mt-2 sm:mt-4">
        <div className="text-xl font-normal text-neutral-500">
          <span className="capitalize">{credit.creditType}</span> member
          <span className="last:hidden">, </span>
          {credit.department && (
            <>
              department: {credit.department}
              <span className="last:hidden">, </span>
            </>
          )}
          {credit.job && <span>job: {credit.job}</span>}
        </div>
      </div>
      {credit.creditType === CreditTypes.Cast && (
        <div className="mt-2 sm:mt-4">
          <div className="text-xl font-normal text-neutral-700">
            Playing {credit.media.character ? credit.media.character : "unknown character"}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CreditDescription);
