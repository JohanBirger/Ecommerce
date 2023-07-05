import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  name: string;
  price: number;
}

interface Cart {
  items: Product[];
  total: string;
}

const CartComponent: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get<Cart>('http://localhost:8000/cart/get');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (product: Product) => {
    try {
      await axios.post('/cart/add', product);
      fetchCart(); // Update cart after adding an item
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {cart ? (
        <div>
          <p>Total: {cart.total}</p>
          <ul>
            {cart.items.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading cart...</p>
      )}
      <button onClick={() => addToCart({ name: 'Product 1', price: 10 })}>
        Add to Cart
      </button>
    </div>
  );
};

export default CartComponent;
