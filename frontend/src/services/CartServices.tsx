import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { BACKEND_URL } from '../config.js';
import {Product} from './Product/ProductInterface'
import { ItemDTO } from './Product/ItemDTO.js';
  
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
        const responseCart = await axios.get(`${BACKEND_URL}/cart/`,{ withCredentials: true });
        const cartData = responseCart.data;
        cartState$.next(cartData);
        if (!cartData){
          return console.log('Cart Empty');
        }
      }else{
        const responseCart = await axios.get(`${BACKEND_URL}/cart/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const cartData = responseCart.data;
        cartState$.next(cartData);
        if (!cartData){
          return console.log('Cart Empty');
        }
      }

    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  export const addToCart = async (productId: string, quantity: number) => {
    try {
      const access_token = localStorage.getItem('access_token');

      if (access_token) {
        console.log('adding to user cart')
        const response = await axios.get(`${BACKEND_URL}/store/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const product = response.data;
        console.log(product)
        const itemDTO: ItemDTO = {
          productId: product._id,
          name: product.name,
          quantity,
          price: product.price,
          description: product.description,
        };

        console.log(itemDTO)
        try{
          await axios.post(`${BACKEND_URL}/cart/`, itemDTO, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
            withCredentials: true,
          });
        } catch (error){
          console.error(error)
        }
        
        fetchCart();
        console.log('Item added to cart');
      }
      else{
        const response = await axios.get(`${BACKEND_URL}/store/products/${productId}`,{ withCredentials: true });
        const product = response.data;

        const itemDTO: ItemDTO = {
          productId: product._id,
          name: product.name,
          quantity,
          price: product.price,
          description: product.description,
        };
      
        await axios.post(`${BACKEND_URL}/cart/`, itemDTO, { withCredentials: true });
        fetchCart();
        console.log('Item added to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  

  export const removeItemFromCart = async (productId: string) => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        console.log('Access token not found');
        
        await axios.delete(`${BACKEND_URL}/cart/`, {
          data: { productId }, // Pass the productId in the request body
          withCredentials: true,
        });
      } else{
        await axios.delete(`${BACKEND_URL}/cart/`, {
          data: { productId }, // Pass the productId in the request body
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
      }

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
        await axios.put(`${BACKEND_URL}/cart/`, { productId, quantity }, {
          withCredentials: true,

        });
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


