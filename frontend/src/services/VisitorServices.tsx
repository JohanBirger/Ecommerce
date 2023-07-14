import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import {BACKEND_URL} from '../config';
import Cookies from 'js-cookie';

// Create a BehaviorSubject for the modal state
const visitorState$ = new BehaviorSubject('');

export const initVisitor = async () => {
  try{
    const response = await axios.get(`${BACKEND_URL}/crypto/`);
    const token = response.data;
    localStorage.setItem('visitor_token',token);
    Cookies.set('visitor_token', token, { secure: true, sameSite: 'None', maxAge: 1 * 60 * 60 * 1000});
    visitorState$.next(token);
  
  } catch (error){
    console.log(error)
  }

};

export const getVisitorToken = async () =>{
  return visitorState$.getValue();
}







export const visitorStateObservable = visitorState$.asObservable();