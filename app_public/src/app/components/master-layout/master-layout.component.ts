import { Component, OnInit } from '@angular/core';
import { APIDataService } from "src/app/api-data.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  constructor(private APIDataService: APIDataService, private router: Router, private authService: AuthenticationService, private http: HttpClient) { }

  public customers: Customer[] = [];
  public username: Username;

  private getCustomers(): void {
    this.APIDataService.getCustomers().subscribe((allCustomers) => this.customers = allCustomers)
  }

  private getUsername(): void {
    this.APIDataService.getUsername().subscribe((username) => this.username = username)
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getCustomers();
    this.getUsername();

  }



  signOut() {
    this.authService.logout()
    setTimeout(() => {
      this.router.navigate(['/login/'])
    }, 1000)
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

export class Username {
  "username": string;
}