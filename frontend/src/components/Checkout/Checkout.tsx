import React, { FormEvent, useEffect, useState } from 'react';
import { initCheckout,getCheckout } from '../../services/Checkout/CheckoutService';
import { getCart } from '../../services/Cart/CartServices';
import { getSession } from '../../services/sessionService';
import { Cart } from '../../services/Cart/CartInterface';
import { FaEthereum } from 'react-icons/fa';
import MetamaskModal from './MetamaskModal';
import {openMetamaskModal} from '../../services/Modals/ModalService'
import jwt_decode from 'jwt-decode'

const CheckoutComponent: React.FC = () => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session && session.user && session.user.email) {
        setEmail(session.user.email);
      }
    })();
  }, []);

 // useEffect(() => {
 //   const cart = JSON.parse(sessionStorage.getItem('cart') || 'false');
 //   if (cart) {
 //     const access_token = localStorage.getItem('access_token')
 //     if (access_token){
  //      const user:any = jwt_decode(access_token);
  //      console.log(user)
  //      initCheckout(cart,user.sub);
  //    }
  //    
  //  }
 // }, [cart]);


  const beginCheckout = async () => {
    setCart(await getCart());
    sessionStorage.setItem('cart',JSON.stringify(await getCart()));
    setCheckingOut(true);
    sessionStorage.setItem('checkingOut',JSON.stringify('true'));
  };

  async function beginPayment(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setCart(await getCart());
    
  }

  return (
    <div className="">
      <button onClick={beginCheckout} className="btn-wide-action" disabled={checkingOut}>
        Checkout
      </button>
      {checkingOut && (
        <div>
          <form onSubmit={beginPayment} className="bg-white p-4 rounded-lg shadow-md">
            <label className="text-gray-700">Send Products To:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button type="submit" onClick={openMetamaskModal} className="btn-wide-action mt-4 flex justify-center items-center ">
              Proceed to payment <FaEthereum size={"24"} />
            </button>
          </form>
        </div>
      )}
      <MetamaskModal />
    </div>
  );
};

export default CheckoutComponent;
