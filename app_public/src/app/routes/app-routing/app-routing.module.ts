import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationLayoutComponent } from '../../components/authentication-layout/authentication-layout.component';
import { LoginComponent } from 'src/app/components/authentication/login/login.component';
import { AddCustomerComponent } from 'src/app/components/customer/add-customer/add-customer.component';

import { RegisterComponent } from 'src/app/components/authentication/register/register.component';
import { MasterLayoutComponent } from 'src/app/components/master-layout/master-layout.component';
import { CustomerMasterComponent } from "src/app/components/customer/customer-master/customer-master.component";
import { DeviceDetailsComponent } from "src/app/components/device/device-details/device-details.component";


const routes: Routes = [
  {
    path: 'add-customer',
    component: MasterLayoutComponent, //to change
  },
  {
    path: 'device/:deviceId',
    component: MasterLayoutComponent,
    children: [
      { path: "", component: AddCustomerComponent },
      { path: "edit", component: AddCustomerComponent },
      { path: "details", component: DeviceDetailsComponent }
    ],
  },
  {
    path: 'customer',
    component: MasterLayoutComponent,
    children: [
      { path: "add", component: AddCustomerComponent },
      { path: ":customerId", component: CustomerMasterComponent },
      { path: "customerId/add-device", component: AddCustomerComponent }
    ],
  },
  {
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
