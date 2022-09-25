import { Component, OnInit } from '@angular/core';
import { APIDataService } from "src/app/api-data.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { HttpClient } from "@angular/common/http";

import { Username } from "../master-layout/master-layout.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private APIDataService: APIDataService, private router: Router, private authService: AuthenticationService, private http: HttpClient) { }


  public username: Username;

  private getUsername(): void {
    this.APIDataService.getUsername().subscribe((username) => this.username = username)
  }
  ngOnInit(): void {
    this.getUsername()
  }

}
