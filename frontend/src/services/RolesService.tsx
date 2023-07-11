import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode'


export enum Role {
    User = 'user',
    Admin = 'admin',
  }
// Create a BehaviorSubject for the modal state
const rolesState$ = new BehaviorSubject<Role[]>([]);

export const fetchRoles = () => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        console.log('Access token not found');
        rolesState$.next([]);
        return;
      }

      const decodedToken: { roles: Role[] } = jwt_decode(access_token);
      const userRoles = decodedToken.roles;
      rolesState$.next(userRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };



export const rolesStateObservable = rolesState$.asObservable();
