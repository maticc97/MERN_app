import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { User } from "../classes/authentication";
import { HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('x-auth-token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, { "email": email, "password": password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        ;
        localStorage.setItem('x-auth-token', user.token);
        console.log(user.token)
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('x-auth-token');
    this.currentUserSubject.next(null);
  }
  getToken() { return localStorage.getItem('x-auth-token') }
  setHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('x-auth-token', this.getToken())
    return headers
  }
}