import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { APIDataService } from "src/app/api-data.service";

import { Device } from "../../customer/customer-master/customer-master.component";

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css']
})

export class DeviceEditComponent implements OnInit {

  constructor(private APIDataService: APIDataService, private route: ActivatedRoute) { }

  public device!: Device;
  public param!: string;

  private getDeviceDetail(): void {
    this.APIDataService.getDeviceDetail(this.param).subscribe((device) => this.device = device)
  }

  ngOnInit() {
    this.param = this.route.snapshot.paramMap.get("deviceId") as string;
    console.log(this.param)
    this.getDeviceDetail();
  }

}

