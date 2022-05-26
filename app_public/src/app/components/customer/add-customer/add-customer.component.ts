import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  addCustomer_form: FormGroup

  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.addCustomer_form = this.fb.group({
      name: [''],
      contact_email: [''],
      engineer_email: [''],
    })
  }

  onSubmit() {
    var formData: any = new FormData();
    formData.append('name', this.addCustomer_form.get('name').value);
    formData.append('contact_email', this.addCustomer_form.get('contact_email').value);
    formData.append('engineer_email', this.addCustomer_form.get('engineer_email').value);

    //convert to json and preapare for node.js
    const fields = {};
    formData.forEach(function (value, key) {
      fields[key] = value;
    });

    this.http.post('http://localhost:5000/api/v1/customers/', fields).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }


  ngOnInit(): void {
  }

}
