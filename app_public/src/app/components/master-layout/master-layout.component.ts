import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  constructor() { }

  customers: Customer[] = [{
    _id: "62497c62bb25ae5385f31a5d",
    timestamp: "2022-04-03T10:52:18.358Z",
    name: "Customer1",
    contact_email: "customer@email.si",
    engineer_email: "mlulik@nil.si",
    added_by: "Uporabnik_1"
  },
  {
    _id: "62497c69bb25ae5385f31a65",
    timestamp: "2022-04-03T10:52:25.140Z",
    name: "Customer3",
    contact_email: "customer@email.si",
    engineer_email: "mlulik@nil.si",
    added_by: "Uporabnik_1"
  }
  ]
  ngOnInit(): void {
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