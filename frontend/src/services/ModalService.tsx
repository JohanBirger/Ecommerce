import { BehaviorSubject } from 'rxjs';
import { deleteCart } from './Cart/CartServices';
import { useMetamask } from './Checkout/PaymentService';

// Create a BehaviorSubject for the modal state
const loginModalState$ = new BehaviorSubject(false);
const registerModalState$ = new BehaviorSubject(false);
const metamaskModalState$ = new BehaviorSubject(false);

export const openLoginModal = () => {
  loginModalState$.next(true);
 
};

export const closeLoginModal = () => {
  loginModalState$.next(false);
};

export const openRegisterModal = () => {
  registerModalState$.next(true);
  
}

export const closeRegisterModal = () => {
  registerModalState$.next(false);
 
}

export const openMetamaskModal = () => {
  metamaskModalState$.next(true);
  sessionStorage.setItem('metamaskModal',JSON.stringify(true))
};

export const closeMetamaskModal = () => {
  metamaskModalState$.next(false);
  sessionStorage.setItem('metamaskModal',JSON.stringify(false));
  
};

export const loginModalStateObservable = loginModalState$.asObservable();
export const registerModalStateObservable = registerModalState$.asObservable();
export const metamaskModalStateObservable = metamaskModalState$.asObservable();