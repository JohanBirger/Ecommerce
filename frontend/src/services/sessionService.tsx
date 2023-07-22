import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import {BACKEND_URL} from '../config';
import Cookies from 'js-cookie';



// Create a BehaviorSubject for the modal state

export enum Role {
  User = 'user',
  Admin = 'admin',
}

interface User {
  username: string,
  email:string,
  id:string,
  roles: Role[],
}

export interface sessionProps{
  user?: User,
  visitor_token?: string,
  loggedIn:boolean,
}


const sessionState$ = new BehaviorSubject<sessionProps | null>(null);

export const initVisitor = async () => {
  if(!Cookies.get('visitor_token')){
  try{
    const response = await axios.get(`${BACKEND_URL}/crypto/`);
    const token = response.data;
    console.log(token)
    const sessionData: sessionProps={
      visitor_token: token,
      loggedIn:false,
    }
    sessionState$.next(sessionData);
    localStorage.setItem('visitor_token',token);
    Cookies.set('visitor_token', token, { secure: true, sameSite: 'None', expires: 1 * 60 * 60 * 1000, domain:"ecommerce-gules-two.vercel.app", path:'/'});
  
  } catch (error){
    console.log(error)
  }
  }

};

export const getVisitorToken = async () =>{
  const token = await sessionState$.value?.visitor_token;
  return token;
}

export const getSession = async () =>{
  const session = await sessionState$.value;
  return session;
}

export const getSessionUser = async () =>{
  const user = await sessionState$.value?.user;
  return user;
}

export const fetchRoles = () => {
  const roles = sessionState$.value?.user?.roles;
  return roles
};


export const logoutUser = async ()=>{
  try {
    await axios.post(`${BACKEND_URL}/auth/logout`);
    localStorage.removeItem('access_token');
    sessionState$.next(null);
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export const loginUser = async (email:string,password:string) =>{
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, {
      email: email,
      password: password,
    });

    // Store the access token in local storage or state
    const { access_token } = response.data;
    await localStorage.setItem('access_token', access_token);
    
    const user = await axios.get(`${BACKEND_URL}/auth/user`,{
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(user.data)

    const userData: User = {
      username: user.data?.username,
      email: email,
      id: user.data?.id,
      roles: user.data?.roles,
    }
    
    const sessionData: sessionProps={
      user: userData,
      loggedIn:true,
    }
    sessionState$.next(sessionData);
    return 'success';
  } catch(error:any){
    console.error('Login error:', error.response?.data.message || error.message);
    return error.response?.data.message || error.message;
  }

}


export const sessionStateObservable = sessionState$.asObservable();