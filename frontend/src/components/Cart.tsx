import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import CheckoutComponent from './Checkout';
import {cross} from 'react-icons-kit/icomoon/cross';
import {Icon} from 'react-icons-kit';
import { BACKEND_URL } from '../config.js';
import CustomNumberInput from './subcomponents/CustomNumberInput';
import { access } from 'fs';
import {cartStateObservable, fetchCart, removeItemFromCart, handleQuantityChange, deleteCart} from '../services/CartServices'
import {Link} from 'react-router-dom';
import ProductContainer from './Products';

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
    const cartSubscription = cartStateObservable.subscribe(cartData => {
      console.log('Updating state with new cart data:', cartData);
      setCart(cartData);
    });
    
  
    return () => {
      cartSubscription.unsubscribe();
    };
  }, []);

  return (
    <div>
        {cart ? (
          <>
        <div className='mx-auto py-2 md:w-1/2'>
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
                      <td className="px-3 py-3">
                        <CustomNumberInput 
                            value={item.quantity} 
                            onIncrement={() => {
                              console.log(`Incrementing product ${item.productId}`);
                              handleQuantityChange(item.productId,item.quantity+1);
                            }} 
                            onDecrement={() => {
                              console.log(`Decrementing product ${item.productId}`);
                              handleQuantityChange(item.productId,item.quantity-1);
                            }}
                          />
                        
                        </td>
                      <td className="px-3 py-3">${item.price}</td>
                      <td className="px-3 py-3">
                        <button onClick={() => removeItemFromCart(item.productId)}>
                          <Icon icon = {cross}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                
              </table>
              
              
            </div>
            <div className="md:flex md:justify-end">
              {cart?.totalPrice && <CheckoutComponent totalPrice={cart.totalPrice} />}
            </div>
            <div>
              
      </div>
      </div>
      <div className="flex flex-flow justify-center items-center p-10">
        <p className='text-lg'>View some of our most popular products</p>
      </div>
        <ProductContainer categoryQuery='poppis-nft'/>
     </div>
      </>
    ) : (
      <>
      <div className="flex flex-flow justify-center items-center p-10">
        <p className='text-lg'>View some of our most popular products</p>
      </div>
        <ProductContainer categoryQuery='poppis-nft'/>
      <div className="flex flex-flow justify-center items-center p-10">
        <p className='text-lg'>View some of our other <Link className='text-blue-500 hover:underline' to='/#products'> products</Link></p>
      </div>
      </>
      
    )}
    </div>
  );
};

export default CartComponent;
//            