import { Component, OnInit } from '@angular/core';
import { APIDataService } from "src/app/api-data.service";

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  constructor(private APIDataService: APIDataService) { }

  public customers: Customer[] = [];

  private getCustomers(): void {
    this.APIDataService.getCustomers().subscribe((allCustomers) => this.customers = allCustomers)
  }

  ngOnInit(): void {
    this.getCustomers();
  }

}

export class Customer {
  "_id": string;
  "timestamp": string;
  "name": string;
  "contact_email": string;
  "engineer_email": string;
  "added_by": string
}