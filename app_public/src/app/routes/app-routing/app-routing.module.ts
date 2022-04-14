import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationLayoutComponent } from '../../components/authentication-layout/authentication-layout.component';
import { LoginComponent } from 'src/app/components/authentication/login/login.component';
import { AddCustomerComponent } from 'src/app/components/customer/add-customer/add-customer.component';

import { RegisterComponent } from 'src/app/components/authentication/register/register.component';
import { MasterLayoutComponent } from 'src/app/components/master-layout/master-layout.component';

const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer-routing.module').then((m) => m.CustomerRoutingModule),
  },
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
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
