import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationLayoutComponent } from '../authentication-layout/authentication-layout.component';

import { AppRoutingModule } from 'src/app/routes/app-routing/app-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule],
  exports: [RegisterComponent, LoginComponent],
})
export class AuthenticationModule {}
