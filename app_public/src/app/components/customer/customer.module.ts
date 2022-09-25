import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCustomerComponent } from './add-customer/add-customer.component';
import { MasterLayoutComponent } from '../master-layout/master-layout.component';

import { AppRoutingModule } from 'src/app/routes/app-routing/app-routing.module';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddCustomerComponent, CustomerMasterComponent, EditCustomerComponent],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  exports: [AddCustomerComponent, CustomerMasterComponent, EditCustomerComponent],
})
export class CustomerModule {

}
