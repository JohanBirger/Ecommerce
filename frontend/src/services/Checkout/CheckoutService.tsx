import { BehaviorSubject } from "rxjs";
import { Cart } from "../Cart/CartInterface";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ItemDTO } from "../Product/ItemDTO";


export  interface CheckOutProps {
  user: string;
  items: ItemDTO[];
  totalPrice: number,
  discount?: number,
  time: string,
  orderId: string,
  txHash:string,
}

const checkoutState$ = new BehaviorSubject<CheckOutProps | null>(null);

export const initCheckout = async (cart: Cart, user: string, txHash:string,discount?:number,) =>{
  const orderId = uuidv4(); // This will generate a unique ID.
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Pad with leading zero if necessary
  const day = ("0" + date.getDate()).slice(-2); // Pad with leading zero if necessary
  const hours = ("0" + date.getHours()).slice(-2); // Pad with leading zero if necessary
  const minutes = ("0" + date.getMinutes()).slice(-2); // Pad with leading zero if necessary

  const time = `${year}-${month}-${day} ${hours}:${minutes}`;
  console.log(user)

  const checkoutData: CheckOutProps = {
    user: user,
    items: cart.items,
    totalPrice:Number(cart.totalPrice),
    discount: discount,
    time: time,
    orderId: orderId,
    txHash:txHash,
  };
  checkoutState$.next(checkoutData);
  try {
    const response = await axios.post(`${BACKEND_URL}/checkout/init`, checkoutData);
    console.log('Successfully saved to database', response.data);
  } catch (error) {
    console.error('Failed to save to database', error);
  }


}

export const getCheckout = async () =>{
  return checkoutState$.getValue();
}


export const getUserOrders = async (userId:any) =>{
  try {
    console.log(userId)
    const response = await axios.get(`${BACKEND_URL}/checkout/${userId}`);
    console.log('User orders', response.data);
    return response.data;
  } catch (error) {
    
    return console.error('Failed to get user orders', error);
    
  }
}

export const checkoutStateObservable = checkoutState$.asObservable();



