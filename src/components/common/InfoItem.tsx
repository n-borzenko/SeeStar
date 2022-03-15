import type { FC } from "react";
import { memo } from "react";

type InfoItemProps = {
  label: string;
  value?: string;
};

const InfoItem: FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="text-lg leading-6 font-normal flex justify-between">
      <span className="text-neutral-700 flex-shrink-0">{label}: </span>
      <span className="text-neutral-300 flex-grow flex-shrink overflow-hidden inline-block mx-1">
        ......................................................................................................................................
      </span>
      <span className="flex-shrink-0">{value && value.length > 0 ? value : "No data"}</span>
    </div>
  );
};

export default memo(InfoItem);
