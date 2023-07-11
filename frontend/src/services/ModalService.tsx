import { BehaviorSubject } from 'rxjs';

// Create a BehaviorSubject for the modal state
const loginModalState$ = new BehaviorSubject(false);
const registerModalState$ = new BehaviorSubject(false);

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

export const loginModalStateObservable = loginModalState$.asObservable();
export const registerModalStateObservable = registerModalState$.asObservable();