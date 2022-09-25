import { Component, OnInit } from '@angular/core';
import { APIDataService } from "src/app/api-data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "src/app/_services/authentication.service";


//import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';
//import { AuthenticationService } from 'src/app/services/authentication.service';
const PROJECT_ID_ROUTE_PARAM = 'projectId';
const PROJECT_LIST_ROUTE = '/project';
const customerId = '';

@Component({
  selector: 'app-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent implements OnInit {

  constructor(private auth: AuthenticationService, private APIDataService: APIDataService, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }



  public param!: string
  public customer!: Customer;


  public devices: Device[] = [];

  private getDevices(): void {
    this.APIDataService.getDevices(this.param).subscribe((allDevices) => this.devices = allDevices)
  }

  private getCustomerDetail(): void {
    this.APIDataService.getCustomerDetail(this.param).subscribe((customer) => this.customer = customer)
  }


  ngOnInit() {
    this.param = this.route.snapshot.paramMap.get("customerId") as string;
    this.getCustomerDetail()
    this.getDevices()
  }

  deleteDevice(deviceId: string, customerId: string) {
    var token = this.auth.getToken()

    if (confirm("are you sure to delete this device?"))
      this.http.delete('http://localhost:5000/api/v1/device/' + deviceId, {
        headers: {
          'x-auth-token': token
        }
      }).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
    setTimeout(() => {
      window.location.reload();
    }, 1000)

  }

  deleteCustomer(customerId: string) {
    var token = this.auth.getToken()
    if (confirm("are you sure to delete this customer and all associated devices?"))
      this.http.delete('http://localhost:5000/api/v1/customers/' + customerId, {
        headers: {
          'x-auth-token': token
        }
      }).subscribe(
        (response) => console.log(response),
        (error) => console.log(error),
      )
    setTimeout(() => {
      this.router.navigate(['/customer/'])
    }, 1000)
  }
}



export class Device {
  "_id": string;
  "timestamp": string;
  "hostname": string;
  "type": String;
  "ip_address": String
  "added_by": string
  "cli_username": string
  "cli_password": string
  "customer": string;
  "config": string;
}

export class Customer {
  "_id": string;
  "timestamp": string;
  "name": string;
  "contact_email": string;
  "engineer_email": string;
  "added_by": string
}

