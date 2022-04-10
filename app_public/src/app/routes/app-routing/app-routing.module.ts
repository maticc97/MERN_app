import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationLayoutComponent } from '../../components/authentication-layout/authentication-layout.component';
import { LoginComponent } from 'src/app/components/authentication/login/login.component';
import { RegisterComponent } from 'src/app/components/authentication/register/register.component';

const paths: Routes = [
  {
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  providers: [],
  imports: [CommonModule, RouterModule.forRoot(paths)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
