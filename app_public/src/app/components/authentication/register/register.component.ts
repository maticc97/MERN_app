import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  addUser_form: FormGroup

  constructor(public fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.addUser_form = fb.group({
      username: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    var formData: any = new FormData();
    formData.append('username', this.addUser_form.get('username').value);
    formData.append('email', this.addUser_form.get('email').value);
    formData.append('password', this.addUser_form.get('password').value);

    //convert to json and preapare for node.js
    const fields = {};
    formData.forEach(function (value, key) {
      fields[key] = value;
    });

    this.http.post('http://localhost:5000/api/v1/register/', fields).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    setTimeout(() => {
      this.router.navigate(['/home/'])
    }, 1000)
  }
}
