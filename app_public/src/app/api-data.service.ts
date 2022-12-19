import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthenticationService } from "./_services/authentication.service";

import { Device } from "./components/customer/customer-master/customer-master.component";
import { Username } from "./components/master-layout/master-layout.component";

import { Customer } from "./components/master-layout/master-layout.component";
import { User } from "./classes/authentication";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIDataService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }



  private apiURL = environment.apiUrl; //kje se nahaja API.

  public getCustomers(): Observable<Customer[]> {
    var token = this.auth.getToken()
    var headers = this.auth.setHeaders()
    const url: string = `${this.apiURL}/customers`;
    return this.http.get<Customer[]>(url, { headers: { 'x-auth-token': token } }).pipe(retry(1), catchError(this.handleError));
  }


  public getCustomerDetail(customerId: string): Observable<Customer> {
    var token = this.auth.getToken()
    var headers = this.auth.setHeaders()
    const url: string = `${this.apiURL}/customers/${customerId}`;
    return this.http.get<Customer>(url, { headers: { 'x-auth-token': token } }).pipe(retry(0), catchError(this.handleError));
  }

  public getDevices(customerId: string): Observable<Device[]> {
    var token = this.auth.getToken()
    var headers = this.auth.setHeaders()
    const url: string = `${this.apiURL}/customers/${customerId}/devices`;
    return this.http.get<Device[]>(url, { headers: { 'x-auth-token': token } }).pipe(retry(0), catchError(this.handleError));
  }


  public getDeviceDetail(deviceId: string):
    Observable<Device> {
    var token = this.auth.getToken();
    const url: string = `${this.apiURL}/device/${deviceId}/`;
    return this.http.get<Device>(url, { headers: { 'x-auth-token': token } }).pipe(retry(0), catchError(this.handleError));
  }

  public getUsername(): Observable<Username> {
    var token = this.auth.getToken()
    var headers = this.auth.setHeaders()
    const url: string = `${this.apiURL}/username/`;
    return this.http.get<Username>(url, { headers: { 'x-auth-token': token } }).pipe(retry(0), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () =>
        `Error occured '${error.status}' z opisom '${error.error.message || error.statusText
        }'`
    );
  }

}
