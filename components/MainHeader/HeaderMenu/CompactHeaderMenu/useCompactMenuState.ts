import { useState, useCallback } from "react";

type MenuState = "isSlidingIn" | "isVisible" | "isSlidingOut" | "isInvisible";
const bodyLockedClass = "body-locked";

const useCompactMenuState = () => {
  const [menuState, setMenuState] = useState<MenuState>("isInvisible");

  const closeMenu = useCallback(() => {
    document.body.classList.remove(bodyLockedClass);
    setMenuState("isInvisible");
  }, []);

  const toggleMenuVisibility = useCallback(() => {
    document.body.classList.add(bodyLockedClass);
    setMenuState((currentState) =>
      currentState === "isVisible" || currentState === "isSlidingIn"
        ? "isSlidingOut"
        : "isSlidingIn"
    );
  }, []);

  const updateStateAfterAnimation = useCallback(() => {
    if (menuState === "isSlidingIn") {
      document.body.classList.add(bodyLockedClass);
      setMenuState("isVisible");
    }
    if (menuState === "isSlidingOut") {
      document.body.classList.remove(bodyLockedClass);
      setMenuState("isInvisible");
    }
  }, [menuState]);

  return { menuState, toggleMenuVisibility, updateStateAfterAnimation, closeMenu };
};

export default useCompactMenuState;
