import React, { useState, ChangeEvent, MouseEvent } from 'react';

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
  }

const ProductFilterComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchFilteredProducts = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    let url = '/api/your-endpoint';
    let query = '';
    
    if (search || category) {
        query = '?';
        if (search) query += `search=${search}&`;
        if (category) query += `category=${category}`;
    }

    const response = await fetch(url + query);
    const data = await response.json();
    setProducts(data);
  }

  return (
    <div>
      <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
      <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)} />
      <button onClick={fetchFilteredProducts}>Fetch Products</button>
      {/* Render your products here */}
    </div>
  );
};

export default ProductFilterComponent;