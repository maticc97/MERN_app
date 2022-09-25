import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { APIDataService } from "src/app/api-data.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/_services/authentication.service";

import { Device } from "../../customer/customer-master/customer-master.component";

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css']
})

export class DeviceEditComponent implements OnInit {

  editDevice_form: FormGroup

  constructor(private auth: AuthenticationService, private APIDataService: APIDataService, private route: ActivatedRoute, private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.editDevice_form = this.fb.group({
      cli_username: [''],
      cli_password: [''],
    })
  }

  public device!: Device;
  public param!: string;

  private getDeviceDetail(): void {
    this.APIDataService.getDeviceDetail(this.param).subscribe((device) => this.device = device)
  }

  ngOnInit() {
    this.param = this.route.snapshot.paramMap.get("deviceId") as string;
    this.getDeviceDetail();
  }

  onSubmit(deviceCustomer: string) {
    var formData: any = new FormData();
    formData.append('cli_username', this.editDevice_form.get('cli_username').value);
    formData.append('cli_password', this.editDevice_form.get('cli_password').value);
    var token = this.auth.getToken()

    //convert to json and preapare for node.js
    const fields = {};
    formData.forEach(function (value, key) {
      fields[key] = value;
    });

    this.http.put('http://localhost:5000/api/v1/device/' + this.param, fields, {
      headers: {
        'x-auth-token': token
      }
    }).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    setTimeout(() => {                           // <<<---using ()=> syntax
      this.router.navigate(["/customer/" + deviceCustomer])
    }, 1000)
  }
}



