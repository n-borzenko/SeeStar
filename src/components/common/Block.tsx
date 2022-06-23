import type { FC, PropsWithChildren } from "react";
import { memo } from "react";

type BlockProps = {
  hidingCondition?: boolean;
};

const Block: FC<PropsWithChildren<BlockProps>> = ({ hidingCondition = false, children }) => {
  return hidingCondition ? null : <>{children}</>;
};

export default memo(Block);
