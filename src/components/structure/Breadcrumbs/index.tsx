import type { FC } from "react";
import Link from "next/link";
import { memo, Fragment } from "react";
import Icon from "components/common/Icon";
import usePathname from "./usePathname";

const Breadcrumbs: FC = () => {
  const pathElements = usePathname();

  if (pathElements.length < 2) {
    return null;
  }

  return (
    <nav className="flex items-center mb-4" aria-label="Breadcrumbs">
      {pathElements.map(({ href, title }, index) =>
        index === pathElements.length - 1 ? (
          <span key={href} className="text-sm capitalize text-neutral-700" aria-current="true">
            {title}
          </span>
        ) : (
          <Fragment key={href}>
            <Link href={href}>
              <a className="capitalize link text-sm" aria-label="Main page">
                {title}
              </a>
            </Link>
            <Icon type="arrow-right" size="medium" className="text-neutral-300 mx-2" />
          </Fragment>
        )
      )}
    </nav>
  );
};

export default memo(Breadcrumbs);
