import React, { createContext, ReactNode, useContext, useState } from "react";

interface MenuContextProps {
  showMenu: boolean;
  menuDisplayToggle: () => void;
  closeMenu: () => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuDisplayToggle = () => {
    setShowMenu((prev) => !prev);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <MenuContext.Provider value={{ showMenu, menuDisplayToggle, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextProps => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
