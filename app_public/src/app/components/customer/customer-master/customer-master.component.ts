import { Component, OnInit } from '@angular/core';
import { APIDataService } from "src/app/api-data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
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

  constructor(private APIDataService: APIDataService, private route: ActivatedRoute) { }



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
  "customer": string
}

export class Customer {
  "_id": string;
  "timestamp": string;
  "name": string;
  "contact_email": string;
  "engineer_email": string;
  "added_by": string
}

