import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent implements OnInit {

  constructor() { }

  customer = {
    _id: "62497c62bb25ae5385f31a5d",
    timestamp: "2022-04-03T10:52:18.358Z",
    name: "Customer1",
    contact_email: "customer@email.si",
    engineer_email: "mlulik@nil.si",
    added_by: "Uporabnik_1"
  }

  devices: Device[] = [{
    _id: "624979f53210bb4d64fc2a69",
    timestamp: "2022-04-03T10:41:57.434Z",
    hostname: "Device_3-SW",
    type: "Router",
    ip_address: "192.128.11.150",
    added_by: "Uporabnik_1"
  },
  {
    _id: "624979fa3210bb4d64fc2a6d",
    timestamp: "2022-04-03T10:42:02.727Z",
    hostname: "Device_4-SW",
    type: "Router",
    ip_address: "192.128.111.150",
    added_by: "Uporabnik_1"

  },
  {
    _id: "624979ff3210bb4d64fc2a71",
    timestamp: "2022-04-03T10:42:07.871Z",
    hostname: "Device_5-SW",
    type: "Router",
    ip_address: "19.128.111.150",
    added_by: "Uporabnik_1"
  },
  {
    _id: "624979ff3210bb4d64fc2a71",
    timestamp: "2022-04-03T10:42:07.871Z",
    hostname: "Device_7-SW",
    type: "Router",
    ip_address: "19.128.111.150",
    added_by: "Uporabnik_1"
  }

  ]

  ngOnInit(): void {
  }

}


export class Device {
  "_id": string;
  "timestamp": string;
  "hostname": string;
  "type": String;
  "ip_address": String
  "added_by": string
}


