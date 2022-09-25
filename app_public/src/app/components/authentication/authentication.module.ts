import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AppRoutingModule } from "src/app/routes/app-routing/app-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthenticationModule { }
