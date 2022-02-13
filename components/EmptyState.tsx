import { FC, memo } from "react";
import Image from "next/image";
import Button from "components/Button";

type EmptyStateProps = { message?: string; buttonTitle?: string; onClick?: () => void };

const EmptyState: FC<EmptyStateProps> = ({ message, buttonTitle, onClick, children }) => {
  const isButtonVisible = buttonTitle && onClick;
  return (
    <div className="min-h-full flex justify-center items-center">
      <div className="flex-basis-[24rem] p-4 flex flex-col justify-center items-center">
        <Image
          src="/assets/empty-state.svg"
          alt="Film reel"
          quality="100"
          width="280"
          height="140"
        />
        {message && <p className="text-center text mt-4 whitespace-pre-line">{message}</p>}
        {isButtonVisible && (
          <Button type="button" onClick={onClick} className="mt-4">
            {buttonTitle}
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};

export default memo(EmptyState);
