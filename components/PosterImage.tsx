import type { FC } from "react";
import clsx from "clsx";
import Image from "next/image";
import { memo, useState, useCallback } from "react";
import Icon from "components/Icon";
import { useAppSelector } from "store/hooks";
import { MediaTypes } from "types/mediaTypes";

type PosterImageProps = {
  src?: string | null;
  type: Exclude<MediaTypes, "any">;
  size: "small" | "medium" | "large";
  rounded?: "none" | "top" | "left";
};

const PosterImage: FC<PosterImageProps> = ({ src, type, size, rounded = "none" }) => {
  const configuration = useAppSelector((state) => state.configuration.data);
  const [isImageReady, setIsImageReady] = useState(false);
  const [isAlternativeIconHidden, setIsAlternativeIconHidden] = useState(src && src.length > 0);

  const onLoad = useCallback(() => setIsImageReady(true), []);
  const onError = useCallback(() => setIsAlternativeIconHidden(false), []);

  const posterSize =
    configuration.posterSizes.find(({ key }) => key === size) || configuration.posterSizes[0];

  return (
    <div
      className={clsx("bg-primary/10 flex justify-center items-center", {
        "rounded-l-lg": rounded === "left",
        "rounded-t-lg": rounded === "top",
      })}
      style={{ width: posterSize.width, height: posterSize.height }}
    >
      {isAlternativeIconHidden ? (
        <Image
          src={`${configuration.secureBaseUrl}${posterSize.id}${src}`}
          alt={`${type} ${type === MediaTypes.Person ? "Picture" : "Poster"}`}
          quality="100"
          width={posterSize.width}
          height={posterSize.height}
          className={clsx("opacity-0 transition-opacity duration-200", {
            "opacity-100": isImageReady,
            "rounded-l-lg": rounded === "left",
            "rounded-t-lg": rounded === "top",
          })}
          onLoad={onLoad}
          onError={onError}
        />
      ) : (
        <Icon type={type} size="huge" className="opacity-30" />
      )}
    </div>
  );
};

export default memo(PosterImage);
