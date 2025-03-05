import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  setToken(token: string):void {
    sessionStorage.setItem('token', token);
    const decoded: any  = jwtDecode(token);
    sessionStorage.setItem('user', decoded.sub);
  }

  getToken(): string {
    return sessionStorage.getItem('token') || '';
  }

  getUser(): string {
    return sessionStorage.getItem('user') || '';
  }

  getPassword(): string {
    return sessionStorage.getItem('password') || '';
  }

  hasPermission(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    } else
    {
      return true;
    }
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}
