import Link from "next/link";
import { memo } from "react";
import { ButtonLink } from "components/common/Button";
import LogoLink from "components/structure/LogoLink";
import { pagesData, footerMenuStructure } from "components/structure/pagesData";

const MainFooter = () => {
  return (
    <footer className="w-full flex justify-center bg-primary">
      <div
        className="xl:max-w-screen-xl p-4 sm:p-8 grow grid grid-cols-2 sm:grid-flow-col sm:grid-cols-none gap-4"
        aria-label="Main navigation"
      >
        <div className="col-span-full sm:col-span-1 pl-3 sm:p-0">
          <LogoLink size="medium" />
        </div>
        {footerMenuStructure.map(({ groupTitle, content }) => (
          <div key={groupTitle} className="col-span-1 grid gap-1 justify-items-start auto-rows-min">
            <p className="pl-3 flex items-center text-lg font-medium text-white/70">{groupTitle}</p>
            {content.map(({ id }) => (
              <Link href={pagesData[id].path} passHref key={id}>
                <ButtonLink color="white" variant="transparent">
                  {pagesData[id].title}
                </ButtonLink>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default memo(MainFooter);
