import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css']
})
export class DeviceEditComponent implements OnInit {

  constructor() { }
  device = {
    hostname: "Device_3-SW",
    type: "Router",
    ip_address: "192.128.11.150",
    customer: "Customer 1",
    cli_username: "admin",
    cli_password: "admin123"
  }
  ngOnInit(): void {
  }

}
