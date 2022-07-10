import type { FC } from "react";
import type { TypedMovie } from "types/movie";
import type { TypedShow } from "types/show";
import { memo } from "react";
import { MediaTypes } from "types/mediaTypes";
import CardHeader from "./blocks/CardHeader";
import CardInfoRow from "./blocks/CardInfoRow";
import CardKnownForList from "./blocks/CardKnownForList";
import LandscapeCardContainer from "./blocks/LandscapeCardContainer";
import getDataAvailability from "./helpers/getDataAvailability";

type PersonLandscapeCardProps = {
  href: string;
  cardSize?: "small" | "adaptive";
  posterPath?: string | null;
  title?: string;
  infoText?: string;
  knownFor?: (TypedMovie | TypedShow)[];
};

// Person card with list of famous works
const PersonLandscapeCard: FC<PersonLandscapeCardProps> = ({
  href,
  cardSize = "adaptive",
  posterPath,
  title,
  infoText,
  knownFor,
}) => {
  const { hasInfoRow } = getDataAvailability({ infoText, infoType: "text" });
  const gridTemplateRows = hasInfoRow ? "auto auto 1fr" : "auto 1fr";

  return (
    <LandscapeCardContainer
      href={href}
      cardSize={cardSize}
      posterPath={posterPath}
      mediaType={MediaTypes.Person}
      gridTemplateRows={gridTemplateRows}
    >
      <CardHeader cardSize={cardSize} mediaType={MediaTypes.Person} title={title} />
      <CardInfoRow cardSize={cardSize} infoType="text" infoText={infoText} />
      <CardKnownForList cardSize={cardSize} items={knownFor} />
    </LandscapeCardContainer>
  );
};

export default memo(PersonLandscapeCard);
