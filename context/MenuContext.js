import { createContext, useState } from 'react';

export const MenuContext = createContext();

const NavOpen = ({ children }) => {
  const [open, setOpen] = useState(false);

  const exposed = {
    open,
    setOpen,
  };

  return (
    <MenuContext.Provider value={exposed}>{children}</MenuContext.Provider>
  );
};

export default NavOpen;
