import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  constructor() { }
  customer = {
    name: "Customer1",
    contact_email: "customer@email.si",
    engineer_email: "mlulik@nil.si",
  }
  ngOnInit(): void {
  }

}
