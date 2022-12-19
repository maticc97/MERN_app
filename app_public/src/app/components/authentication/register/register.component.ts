import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public takenEmail = false;
  public takenUsername = false;

  addUser_form: FormGroup

  constructor(public fb: FormBuilder, private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) {
    this.addUser_form = fb.group({
      username: [''],
      email: [''],
      password: ['']
    })
    if (this.authenticationService.currentUserValue != null) {
      console.log(authenticationService.currentUserValue)
      this.router.navigate(['/home']);
    }
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

    this.http.post(environment.apiUrl + 'register/', fields).subscribe(
      (response) => {
        switch (response) {
          case 409:
            console.log("aaaaa");
            window.alert("Hello world!");
            break;
        }
      },
      (error) => {
        switch (error.status) {
          case 409:
            this.takenEmail = true;
            window.alert("Account with this username already in use. Please choose another username")
            break;
          
          case 410:
            this.takenUsername = true;
            window.alert("Account with this email already in use. Please choose another email")
            break;
        }
      }
      
    )
    setTimeout(() => {
      this.router.navigate(['/home/'])
    }, 1000)
    
  }
}
