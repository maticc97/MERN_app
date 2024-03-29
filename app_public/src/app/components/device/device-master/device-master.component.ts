import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { APIDataService } from "src/app/api-data.service";

import { Router } from "@angular/router";
import { Device } from "../../customer/customer-master/customer-master.component";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "src/app/_services/authentication.service";

@Component({
  selector: 'app-device-master',
  templateUrl: './device-master.component.html',
  styleUrls: ['./device-master.component.css']
})
export class DeviceMasterComponent implements OnInit {

  constructor(private auth: AuthenticationService, private http: HttpClient, private APIDataService: APIDataService, private route: ActivatedRoute, private router: Router) { }

  public param!: string;
  public device!: Device;

  private getDeviceDetail(): void {
    this.APIDataService.getDeviceDetail(this.param).subscribe((device) => this.device = device)
  }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get("deviceId") as string;
    console.log(this.param)
    this.getDeviceDetail()
  }


  deleteDevice(deviceId: string, customerId: string) {

    var token = this.auth.getToken()

    if (confirm("are you sure to delete this device?"))
      this.http.delete('http://localhost:5000/api/v1/customers/' + customerId + '/devices/' + deviceId, {
        headers: {
          'x-auth-token': token
        }
      }).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
    setTimeout(() => {                           // <<<---using ()=> syntax
      this.router.navigate(['/customer/' + customerId])
    }, 1000);
  }

  

}
