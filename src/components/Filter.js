import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

const Filter = ({ onFilter }) => {
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const [colors, setColors] = useState([]);
  const [capacities, setCapacities] = useState([]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const products = await fetchProducts();
        const uniqueColors = [...new Set(
          products
            .filter(product => product.data && product.data.color)
            .map(product => product.data.color.toLowerCase())
        )].map(c => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase());
        const uniqueCapacities = [...new Set(
          products
            .filter(product => product.data && product.data.capacity)
            .map(product => product.data.capacity)
        )];

        setColors(uniqueColors);
        setCapacities(uniqueCapacities);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    loadFilters();
  }, []);

  const handleFilterClick = () => {
    onFilter(color, capacity);
  };

  return (
    <div className="filter-section">
      <select onChange={(e) => setColor(e.target.value)} value={color}>
        <option value="">Filter by Color</option>
        {colors.map((color, index) => (
          <option key={index} value={color}>{color}</option>
        ))}
      </select>

      <select onChange={(e) => setCapacity(e.target.value)} value={capacity}>
        <option value="">Filter by Capacity</option>
        {capacities.map((capacity, index) => (
          <option key={index} value={capacity}>{capacity}</option>
        ))}
      </select>

      <button onClick={handleFilterClick}>Filter</button>
    </div>
  );
};

export default Filter;
