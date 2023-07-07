import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


interface Product {
  name: string;
  price: number;
}

interface Cart {
  items: Product[];
  totalPrice: string;
}

const CartComponent: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        console.error('Access token not found');
        return;
      }

      const responseCart = await axios.get('http://localhost:8000/cart/', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const cartData = responseCart.data;
      setCart(cartData);
      if (!cartData){
        return console.log('Cart Empty');
      }

      const cartItems: Product[] = [];

      for (const item of cartData.items) {
        const responseProduct = await axios.get(
          `http://localhost:8000/store/products/${item.productId}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const productData = responseProduct.data;
        cartItems.push(productData);
      }
      
      setCartItems(cartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  
  const deleteCart = async (): Promise<void> => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        console.log('Access token not found');
        return;
      }
      
      const decodedToken: any = jwt_decode(access_token); // Decode the access token
      const userId: string = decodedToken.sub; // Extract the user ID from the decoded token
      console.log(decodedToken)
  
      await axios.delete(`http://localhost:8000/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      fetchCart();
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  return (
    <div className="max-w-xs mx-auto">
    <h1 className="text-2xl font-bold mb-4">Cart</h1>
    {cart ? (
      <div>
        <p className="mb-2">Total: {cart.totalPrice}</p>
        <table className="w-full mb-4">
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td className="py-2">{item.name}</td>
                <td className="py-2">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
      onClick={deleteCart}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Remove Cart
    </button>
      </div>
      
    ) : (
      <p>No products</p>
    )}
    
  </div>
  );
};

export default CartComponent;
