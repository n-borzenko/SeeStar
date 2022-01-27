import { useState, useCallback } from "react";

const useSelectedSubmenu = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>();

  const resetSubmenuSelection = useCallback(() => setSelectedGroupId(undefined), []);

  const closeSubmenuById = useCallback(
    (id: string) => {
      if (id === selectedGroupId) {
        setSelectedGroupId(undefined);
      }
    },
    [selectedGroupId]
  );
  const toggleSubmenuById = useCallback(
    (id: string) => setSelectedGroupId(id === selectedGroupId ? undefined : id),
    [selectedGroupId]
  );

  return { selectedGroupId, closeSubmenuById, toggleSubmenuById, resetSubmenuSelection };
};

export default useSelectedSubmenu;
