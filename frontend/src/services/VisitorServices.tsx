import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import {BACKEND_URL} from '../config';
import {FRONTEND_URL} from '../config';
import Cookies from 'js-cookie';

// Create a BehaviorSubject for the modal state
const visitorState$ = new BehaviorSubject('');

export const initVisitor = async () => {
  try{
    const response = await axios.get(`${BACKEND_URL}/crypto/`);
    const token = response.data;
    console.log(token)
    localStorage.setItem('visitor_token',token);
    Cookies.set('visitor_token', token, { secure: true, sameSite: 'None', expires: 1 * 60 * 60 * 1000, domain:"ecommerce-gules-two.vercel.app", path:'/'});
    visitorState$.next(token);
  
  } catch (error){
    console.log(error)
  }

};

export const getVisitorToken = async () =>{
  const token = visitorState$.getValue();
  return token;
}







export const visitorStateObservable = visitorState$.asObservable();