import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserInfo } from '../models/user';
import { environment } from '../../environments/environment';
import { CartService } from './cart.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserInfo | null>;
  public currentUser: Observable<UserInfo | null>;

  constructor(private http: HttpClient, private cartService: CartService) {
    this.currentUserSubject = new BehaviorSubject<UserInfo | null>(
      localStorage.getItem('currentUser')
        ? JSON.parse(localStorage.getItem('currentUser') || '{}')
        : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserInfo | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<UserInfo>(`${environment.apiUrl}/api/users/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http
      .post<UserInfo>(`${environment.apiUrl}/api/users/register`, {
        name,
        email,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  update(name: string, email: string, password: string) {
    return this.http
      .put<UserInfo>(`${environment.apiUrl}/api/users/update-profile`, {
        name,
        email,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // Clear the cart when the user logs out
    this.cartService.clearItems();

    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  forgotPassword(email: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/api/users/forgot-password`,
      { email }
    );
  }

  resetPassword(token: string, password: string): Observable<any> {
    const resetPasswordUrl = `${environment.apiUrl}/api/users/reset-password`;
    const requestBody = { token, password };
  
    return this.http.post<any>(resetPasswordUrl, requestBody)
      .pipe(
        catchError((error) => {
          console.error('Reset Password Error:', error);
          throw error;
        })
      );
  }
  
}
