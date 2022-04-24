import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routes/app-routing/app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { MasterLayoutComponent } from './components/master-layout/master-layout.component';

import { AuthenticationModule } from './components/authentication/authentication.module';
import { CustomerModule } from './components/customer/customer.module';
import { AuthenticationLayoutComponent } from './components/authentication-layout/authentication-layout.component';
import { CustomerRoutingModule } from './routes/app-routing/customer-routing.module';
import { DeviceMasterComponent } from './components/device/device-master/device-master.component';
import { DeviceEditComponent } from './components/device/device-edit/device-edit.component';
import { DeviceAddComponent } from './components/device/device-add/device-add.component';

@NgModule({
  declarations: [
    LayoutComponent,
    MasterLayoutComponent,
    AuthenticationLayoutComponent,
    DeviceMasterComponent,
    DeviceEditComponent,
    DeviceAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    AuthenticationModule,
    CustomerRoutingModule,
  ],
  providers: [],
  bootstrap: [LayoutComponent],
})
export class AppModule { }
