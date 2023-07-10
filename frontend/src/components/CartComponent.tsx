import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import CheckoutComponent from './Checkout';
import {cross} from 'react-icons-kit/icomoon/cross';
import {Icon} from 'react-icons-kit';
import { BACKEND_URL } from '../config.js';



interface Product {
  name: string;
  price: number;
  quantity:number;
  productId: string
}

interface Cart {
  items: Product[];
  totalPrice: string;
}

const CartComponent: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);


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

      const responseCart = await axios.get(`${BACKEND_URL}/cart/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const cartData = responseCart.data;
      console.log(cartData)
      setCart(cartData);
      if (!cartData){
        return console.log('Cart Empty');
      }

      
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const removeItemFromCart = async (productId: string) => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        console.log('Access token not found');
        return;
      }

      await axios.delete(`${BACKEND_URL}/cart/`, {
        data: { productId }, // Pass the productId in the request body
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      fetchCart();
      console.log("Item removed");
    } catch (error) {
      console.error('Error removing item from cart:', error);
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
  
      await axios.delete(`${BACKEND_URL}/cart/${userId}`, {
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
    <div className='mx-auto py-2 md:w-1/2'>
    {cart ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left">Product</th>
                <th className="px-3 py-2 text-left">Quantity</th>
                <th className="px-3 py-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item, index) => (
                <tr key={index} className="bg-gray-100">
                  <td className="px-3 py-3">{item.name}</td>
                  <td className="px-3 py-3">{item.quantity}</td>
                  <td className="px-3 py-3">${item.price}</td>
                  <td className="px-3 py-3">
                    <button onClick={() => removeItemFromCart(item.productId)}>
                      <Icon icon = {cross}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <button onClick={deleteCart} className="btn-small mx-auto">
              Empty Cart
            </button>
          </table>
          
        </div>
        <div className="md:flex md:justify-end">
          {cart?.totalPrice && <CheckoutComponent totalPrice={cart.totalPrice} />}
        </div>
      </div>
    ) : (
      <p>No products</p>
    )}
  </div>
  );
};

export default CartComponent;
