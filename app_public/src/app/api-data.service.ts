import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Device } from "./components/customer/customer-master/customer-master.component";

import { Customer } from "./components/master-layout/master-layout.component";

@Injectable({
  providedIn: 'root'
})
export class APIDataService {

  constructor(private http: HttpClient) { }

  private apiURL = 'http://localhost:5000/api/v1'; //kje se nahaja API.

  public getCustomers(): Observable<Customer[]> {
    const url: string = `${this.apiURL}/customers`;
    return this.http.get<Customer[]>(url).pipe(retry(1), catchError(this.handleError));
  }

  public getCustomerDetail(customerId: string): Observable<Customer> {
    const url: string = `${this.apiURL}/customers/${customerId}`;
    return this.http.get<Customer>(url).pipe(retry(1), catchError(this.handleError));
  }

  public getDevices(customerId: string): Observable<Device[]> {
    const url: string = `${this.apiURL}/customers/${customerId}/devices`;
    return this.http.get<Device[]>(url).pipe(retry(1), catchError(this.handleError));
  }


  public getDeviceDetail(deviceId: string):
    Observable<Device> {
    const url: string = `${this.apiURL}/device/${deviceId}/`;
    return this.http.get<Device>(url).pipe(retry(1), catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    return throwError(
      () =>
        `Error occured '${error.status}' z opisom '${error.error.message || error.statusText
        }'`
    );
  }

}
