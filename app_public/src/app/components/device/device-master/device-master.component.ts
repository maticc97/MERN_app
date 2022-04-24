import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-master',
  templateUrl: './device-master.component.html',
  styleUrls: ['./device-master.component.css']
})
export class DeviceMasterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  device = {
    _id: "624979f53210bb4d64fc2a69",
    timestamp: "2022-04-03T10:41:57.434Z",
    hostname: "Device_3-SW",
    type: "Router",
    ip_address: "192.128.11.150",
    customer: "Customer 1",
    cli_username: "admin",
    added_by: "Uporabnik_1",
    config: "running-config\
    Building configuration...\
    Current configuration : 3781 bytes\
    !\
    version 12.3\
    no service pad\
    service timestamps debug datetime msec\
    service timestamps log datetime msec\
    no service password-encryption.........\
    "

  }

}
