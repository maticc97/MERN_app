import { Component, OnInit } from '@angular/core';
import { APIDataService } from "src/app/api-data.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/_services/authentication.service";

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  constructor(private APIDataService: APIDataService, private router: Router, private authService: AuthenticationService) { }

  public customers: Customer[] = [];

  private getCustomers(): void {
    this.APIDataService.getCustomers().subscribe((allCustomers) => this.customers = allCustomers)
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getCustomers();
  }



  signOut() {
    this.authService.logout()
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