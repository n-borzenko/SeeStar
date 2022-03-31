import type { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { memo } from "react";
import { ButtonLink } from "components/common/Button";

type BlockHeaderProps = {
  title: string;
  href?: string;
};

const BlockHeader: FC<PropsWithChildren<BlockHeaderProps>> = ({ title, href, children }) => {
  return (
    <div className="mt-4 lg:mt-8 mb-2 lg:mb-6 h-8 flex justify-between items-center">
      <h5>{title}</h5>
      {href && (
        <Link href={href} passHref>
          <ButtonLink icon="go-to-arrow" variant="outlined" ariaLabel="Show details" />
        </Link>
      )}
      {children}
    </div>
  );
};

export default memo(BlockHeader);
