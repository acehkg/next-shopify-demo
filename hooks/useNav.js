import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';
const useNav = () => useContext(MenuContext);

export default useNav;
