import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BROWSER_STORAGE } from '../classes/storage';

import { UserData } from "../classes/authentication";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage, private router: Router) { }

  public getToken(): string {
    return this.storage.getItem('annotate-me-token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('annotate-me-token', token);
  }

  public login(user): Promise<UserData> {

    const url: string = `${this.apiUrl}/login`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(odgovor => {
        this.saveToken(odgovor["token"]);
      })
      .catch(this.handleError);

  }

  public register(user): Promise<UserData> {
    const url: string = `${this.apiUrl}/register`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(odgovor => {
        this.saveToken(odgovor["token"]);
      })
      .catch(this.handleError)
  }

  public resetPassword(user): Promise<UserData> {
    const url: string = `${this.apiUrl}/password-reset`;
    return this.http
      .put(url, user)
      .toPromise()
      .then(odgovor => odgovor as UserData)
      .catch(this.handleError)
  }

  public logout(): void {
    this.storage.removeItem('annotate-me-token');
    this.router.navigate(['login']);
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const actualToken = JSON.parse(this.b64Utf8(token.split('.')[1]));
      return actualToken.validUntil > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): UserData {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { _id, email, username, roles } = JSON.parse(this.b64Utf8(token.split('.')[1]));
      return { _id, email, username, roles } as UserData;
    }
    return null;
  }

  private b64Utf8(str: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(
          atob(str),
          (char: string) => {
            return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
          }
        )
        .join('')
    );
  };

  private handleError(err: any): Promise<any> {
    console.error("Something went wrong");
    console.error(err);
    return err.status;
  }
}