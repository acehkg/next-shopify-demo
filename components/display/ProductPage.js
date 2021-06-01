import { useState, useEffect } from 'react';
import ProductSelector from '../display/ProductSelector';
const ProductPage = ({ product }) => {
  const [selected, setSelected] = useState(product.variants[0]);
  return <ProductSelector product={product} setSelected={setSelected} />;
};

export default ProductPage;
