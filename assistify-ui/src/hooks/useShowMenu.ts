import { useState } from "react";

/**
 * Custom hook to determine if the current device is mobile.
 * @returns {boolean} - True if the device is mobile, false otherwise.
 */
const useShowMenu = (): {
  handleSideMenuToggle: () => void;
  showMenu: boolean;
} => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleSideMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return { handleSideMenuToggle, showMenu };
};

export default useShowMenu;
