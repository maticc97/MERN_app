import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  addCustomer_form: FormGroup

  constructor(private router: Router, public fb: FormBuilder, private http: HttpClient, private auth: AuthenticationService) {
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

    var token = this.auth.getToken()


    this.http.post(environment.apiUrl + 'customers/', fields, {
      headers: {
        'x-auth-token': token
      }
    }).subscribe(
      (response) => console.log(response),
      (error) => {
        switch (error.status) {
          case 409:
            window.alert("Company already exists");
        } 
      }
    )

    setTimeout(() => {                           // <<<---using ()=> syntax
      this.router.navigate(['/home/'])
    }, 1000)
  }


  ngOnInit(): void {
  }

}
