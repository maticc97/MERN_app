import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationLayoutComponent } from '../../components/authentication-layout/authentication-layout.component';
import { LoginComponent } from 'src/app/components/authentication/login/login.component';
import { AddCustomerComponent } from 'src/app/components/customer/add-customer/add-customer.component';

import { RegisterComponent } from 'src/app/components/authentication/register/register.component';
import { MasterLayoutComponent } from 'src/app/components/master-layout/master-layout.component';
import { CustomerMasterComponent } from "src/app/components/customer/customer-master/customer-master.component";
import { DeviceMasterComponent } from "src/app/components/device/device-master/device-master.component";
import { EditCustomerComponent } from "src/app/components/customer/edit-customer/edit-customer.component";
import { DeviceEditComponent } from "src/app/components/device/device-edit/device-edit.component";
import { DeviceAddComponent } from "src/app/components/device/device-add/device-add.component";

import { AuthGuard } from "src/app/_helpers/auth.guard";
import { HomepageComponent } from "src/app/components/homepage/homepage.component";

const routes: Routes = [
    {
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: "home",
    component: MasterLayoutComponent,
    children: [
      { path: "", component: HomepageComponent },
    ],
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'device',
    component: MasterLayoutComponent,
    children: [
      { path: ":deviceId/", component: DeviceMasterComponent },
      { path: ":deviceId/edit", component: DeviceEditComponent },
      { path: ":deviceId/details", component: DeviceMasterComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'customer',
    component: MasterLayoutComponent,
    children: [
      { path: "add", component: AddCustomerComponent },
      { path: ":customerId", component: CustomerMasterComponent },
      { path: ":customerId/add-device", component: DeviceAddComponent },
      { path: ":customerId/edit", component: EditCustomerComponent }
    ],
    canActivate: [AuthGuard]
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
export class AppRoutingModule { }

