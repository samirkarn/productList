import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api/db.json';

console.log(`Server is running on ${API_URL}`)

// Fetching (Get) the product from db.json
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Something went wrong', error);
    throw error;
  }
};

// Add product (Post) to db.json
export const addProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.error('Something went wrong', error);
    throw error;
  }
};
