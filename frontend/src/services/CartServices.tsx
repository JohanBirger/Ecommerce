import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
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
// Create a BehaviorSubject for the modal state
const cartState$ = new BehaviorSubject<Cart | null>(null);

export const fetchCart = async () => {
    console.log('fetchCart called');
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
      cartState$.next(cartData);
      if (!cartData){
        return console.log('Cart Empty');
      }

      
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  export const removeItemFromCart = async (productId: string) => {
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

  export const handleQuantityChange = (productId: string, quantity:number) => {
    updateItemQuantityCart(productId,quantity);
  };

  const updateItemQuantityCart = async (productId: string, quantity:number) =>{
    try{
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        throw new Error("Access-token not found. Login again.")
      }
      
      await axios.put(`${BACKEND_URL}/cart/`, { productId, quantity }, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("changed")
      fetchCart();
    } catch (error) {
      console.error('Error updating item quantity in cart:', error);
    }
  }

  
  
  export const deleteCart = async (): Promise<void> => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        console.log('Access token not found');
        return;
      }
      
      const decodedToken: any = jwt_decode(access_token); // Decode the access token
      const userId: string = decodedToken.sub; // Extract the user ID from the decoded token
      
  
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



export const cartStateObservable = cartState$.asObservable();