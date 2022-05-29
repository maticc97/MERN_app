import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { APIDataService } from "src/app/api-data.service";
import { Customer, Device } from "../customer-master/customer-master.component";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  editCustomer_form: FormGroup

  constructor(private router: Router, private http: HttpClient, private APIDataService: APIDataService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.editCustomer_form = this.formBuilder.group({

      contact_email: [''],
      engineer_email: [''],
    })
  }

  public device!: Device;
  public param!: string;
  public customer!: Customer
  private getCustomerDetail(): void {
    this.APIDataService.getCustomerDetail(this.param).subscribe((customer) => this.customer = customer)
  }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('customerId')
    console.log(this.param)
  }

  onSubmit() {
    var formData: any = new FormData();
    formData.append('contact_email', this.editCustomer_form.get('contact_email').value);
    formData.append('engineer_email', this.editCustomer_form.get('engineer_email').value);


    //convert to json and preapare for node.js
    const fields = {};
    formData.forEach(function (value, key) {
      fields[key] = value;
    });

    fields["name"] = this.param

    this.http.put('http://localhost:5000/api/v1/customers/' + this.param, fields).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    setTimeout(() => {                           // <<<---using ()=> syntax
      this.router.navigate(['/customer/'])
    }, 1000)
  }
}




