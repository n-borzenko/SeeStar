import { FocusEvent, useCallback, useRef } from "react";

const useFocusLoop = () => {
  const burgerButton = useRef<HTMLButtonElement>(null);
  const itemsListContainer = useRef<HTMLUListElement>(null);

  const setFocusOnBurgerButton = useCallback(() => {
    burgerButton.current?.focus();
  }, []);

  const setFocusOnLastLink = useCallback((e: FocusEvent<HTMLDivElement, HTMLElement>) => {
    if (e.relatedTarget !== burgerButton.current) {
      burgerButton.current?.focus();
    } else {
      const links = itemsListContainer.current?.querySelectorAll<HTMLAnchorElement>(
        ".js-compact-menu-item:not(.hidden) .js-compact-menu-link"
      );
      if (links && links.length > 0) {
        links[links.length - 1].focus();
      }
    }
  }, []);

  return { burgerButton, itemsListContainer, setFocusOnBurgerButton, setFocusOnLastLink };
};

export default useFocusLoop;
