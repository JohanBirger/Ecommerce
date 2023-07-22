import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCheckout, getUserOrders } from '../services/Checkout/CheckoutService';
import { CheckOutProps } from '../services/Checkout/CheckoutService';
import { getCartById } from '../services/Cart/CartServices';
import { Cart } from '../services/Cart/CartInterface';

const Orders: React.FC = () => {
  const [checkout, setCheckout] = useState<CheckOutProps[]|null>(null);
  const [selectedOrder, setSelectedOrder] = useState<CheckOutProps|null>(null);
  const { '*' : userId } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      const checkoutData = await getUserOrders(userId);
      console.log('OrderComplete.getUserOrders', checkoutData);
      setCheckout(checkoutData);
      setSelectedOrder(checkoutData[0]); // select first order by default
    }
    fetchOrders();
  }, [userId]);

  const handleSelectOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = checkout?.find(order => order.time === event.target.value);
    setSelectedOrder(selectedOrder || null);
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center moralis-blue'>
    <div className='min-h-screen  w-4/5 moralis-blue grid lg:grid-cols-4 grid-rows-2 gap-3'> 
    <div className='p-5 m-5 lg:justify-end'>
    {checkout && (
          <div className='flex flex-col justify-center items-center'>
            
            <select className ="border border-gray-300 text-md p-2 h-12 rounded-md focus:outline-none focus:ring-none focus:ring-none w-64" onChange={handleSelectOrder}>
              {checkout.map((checkoutItem:any, index:any) => (
                <option key={index} value={checkoutItem.time}>
                  {checkoutItem.time}
                </option>
              ))}
            </select>
          </div>
        )}
    </div>
    <div className='bg-white rounded-md box-shadow border-color-grey  p-5 m-5 lg:col-span-3 col-span-full'>
      {selectedOrder && (
              <div className=''>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                      <div>
                        
                          <table className="w-full pb-10">
                            
                              <thead>
                                    <tr>
                                      <th className='lg:px-3 lg:py-2 text-left lg:text-md text-sm'>Reciept: {selectedOrder.txHash}</th>
                                    </tr>
                                  <tr>
                                      <th className="lg:px-3 lg:py-2 text-left">Product</th>
                                      <th className="lg:px-3 lg:py-2 text-left">Quantity</th>
                                      <th className="lg:px-3 lg:py-2 text-left">Price</th>
                                  </tr>
                                  
                              </thead>
                              <tbody>
                                  {selectedOrder?.items?.map((item:any, idx:any) => (
                                      <tr key={idx} className="">
                                          <td className="lg:px-3 lg:py-3">{item.name}</td>
                                          <td className="lg:px-3 lg:py-3">{item.quantity}</td>
                                          <td className="lg:px-3 lg:py-3">${item.price}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                          
                      </div>
                      <div className="md:flex md:justify-end">
                  {selectedOrder.totalPrice ? (
                      <>
                          <div>
                              <h2 className="lg:text-xl text-md font-bold lg:mb-4 mt-2">Total Amount</h2>
                              <div className="flex items-center mb-4">
                                  <span className="text-500 text-black">Total:</span>
                                  <span className="text-500 text-black ml-2">${selectedOrder.totalPrice}</span>
                              </div>
                          </div>
                      </>
                  ) : null}
              </div>
          </div>
      </div>
  )}

    </div>
  </div>
  </div>
  );
};

export default Orders;
