import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import Productcard from './ProductCard';
import Filter from './Filter';
import Charts from './Charts';
import AddProduct from './AddProduct';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetching the product list
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function for apply filter on color & capacity
  const handleFilter = (color, capacity) => {
    const filtered = products.filter((product) => {
      const matchesColor = color ? product.data?.color === color : true;
      const matchesCapacity = capacity ? product.data?.capacity === capacity : true;
      return matchesColor && matchesCapacity;
    });
    setFilteredProducts(filtered);
  };

  // Reload the page after adding the product
  const handleProductAdded = () => {
    window.location.reload();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <AddProduct onProductAdded={handleProductAdded} />
      <Filter onProductAdded={handleProductAdded} onFilter={handleFilter} />
      <div className="product-list">
        {filteredProducts.map((product) => (
          <Productcard key={product.id} product={product} />
        ))}
      </div>
      <Charts products={filteredProducts} />
    </div>
  );
};

export default ProductList;
