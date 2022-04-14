import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AddCustomerComponent } from 'src/app/components/customer/add-customer/add-customer.component';
import { MasterLayoutComponent } from 'src/app/components/master-layout/master-layout.component';
import { LoginComponent } from 'src/app/components/authentication/login/login.component';

const routes: Routes = [
  {
    path: "",
    component: MasterLayoutComponent,
    children: [
      {
        path: "add",
        component: LoginComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
