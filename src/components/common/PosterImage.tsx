import type { FC } from "react";
import clsx from "clsx";
import { memo, useState, useCallback, useMemo } from "react";
import Icon from "components/common/Icon";
import getImageSize from "helpers/getImageSize";
import useConfigurationRequest from "hooks/configuration/useConfigurationRequest";
import { MediaTypes } from "types/mediaTypes";

type PosterImageProps = {
  src?: string | null;
  type: Exclude<MediaTypes, "any">;
  size: "small" | "medium" | "large";
  rounded?: "none" | "top" | "left";
};

const PosterImage: FC<PosterImageProps> = ({ src, type, size, rounded = "none" }) => {
  const imageSize = getImageSize(size);
  const configuration = useConfigurationRequest();
  const [isImageReady, setIsImageReady] = useState(false);
  const [isAlternativeIconHidden, setIsAlternativeIconHidden] = useState(src && src.length > 0);

  const onLoad = useCallback(() => setIsImageReady(true), []);
  const onError = useCallback(() => setIsAlternativeIconHidden(false), []);

  const links = useMemo(() => {
    if (configuration.state !== "succeeded" || !src || src.length === 0) {
      return undefined;
    }

    const size1xId =
      configuration.data.imageSizes.find(({ width }) => width >= imageSize.width)?.id ??
      configuration.data.fallbackSizeId;
    const size2xId =
      configuration.data.imageSizes.find(({ width }) => width >= imageSize.width * 2)?.id ??
      configuration.data.fallbackSizeId;

    return {
      srcSet: `
        ${configuration.data.secureBaseUrl}${size1xId}${src} 1x,
        ${configuration.data.secureBaseUrl}${size2xId}${src} 2x
      `,
      src: `${configuration.data.secureBaseUrl}${size1xId}${src}`,
    };
  }, [configuration, imageSize.width, src]);

  return (
    <div
      className={clsx("bg-primary/10 flex justify-center items-center max-w-full max-h-full", {
        "rounded-l-lg": rounded === "left",
        "rounded-t-lg": rounded === "top",
      })}
      style={{ width: imageSize.width, height: imageSize.height }}
    >
      {isAlternativeIconHidden && links && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          srcSet={links.srcSet}
          src={links.src}
          alt={`${type} ${type === MediaTypes.Person ? "Picture" : "Poster"}`}
          width={imageSize.width}
          height={imageSize.height}
          className={clsx("opacity-0 transition-opacity duration-200", {
            "opacity-100": isImageReady,
            "rounded-l-lg": rounded === "left",
            "rounded-t-lg": rounded === "top",
          })}
          onLoad={onLoad}
          onError={onError}
        />
      )}
      {!isAlternativeIconHidden && <Icon type={type} size="huge" className="opacity-30" />}
    </div>
  );
};

export default memo(PosterImage);
