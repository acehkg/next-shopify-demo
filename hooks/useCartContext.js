import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
const useCartContext = () => useContext(CartContext);

export default useCartContext;
