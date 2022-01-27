import { useState, useCallback } from "react";

type MenuState = "isSlidingIn" | "isVisible" | "isSlidingOut" | "isInvisible";

const useCompactMenuState = () => {
  const [menuState, setMenuState] = useState<MenuState>("isInvisible");

  const closeMenu = useCallback(() => {
    setMenuState("isInvisible");
  }, []);

  const toggleMenuVisibility = useCallback(
    () =>
      setMenuState((currentState) =>
        currentState === "isVisible" || currentState === "isSlidingIn"
          ? "isSlidingOut"
          : "isSlidingIn"
      ),
    []
  );

  const updateStateAfterAnimation = useCallback(() => {
    if (menuState === "isSlidingIn") {
      setMenuState("isVisible");
    }
    if (menuState === "isSlidingOut") {
      setMenuState("isInvisible");
    }
  }, [menuState]);

  return { menuState, toggleMenuVisibility, updateStateAfterAnimation, closeMenu };
};

export default useCompactMenuState;
