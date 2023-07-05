import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/products.css'; // Import the CSS file for styling

interface Product {
  id: string;
  name: string;
  price: number;
}

const ProductCard: React.FC<Product & { onAddToCart: () => void }> = ({
  id,
  name,
  price,
  onAddToCart,
}) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:8000/products/all')
      .then((response) => {
        // Handle the response data
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log('product');
        // Handle the error
        console.error(error);
      });
  };

  const addToCart = (productId: string) => {
    axios
      .post('http://localhost:8000/cart/add', { productId })
      .then((response) => {
        console.log('Item added to cart:', response.data);
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="card-container">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={() => addToCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;