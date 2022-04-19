import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCustomerComponent } from './add-customer/add-customer.component';
import { MasterLayoutComponent } from '../master-layout/master-layout.component';

import { AppRoutingModule } from 'src/app/routes/app-routing/app-routing.module';
import { CustomerMasterComponent } from './customer-master/customer-master.component';

@NgModule({
  declarations: [AddCustomerComponent, CustomerMasterComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [AddCustomerComponent, CustomerMasterComponent],
})
export class CustomerModule { }
