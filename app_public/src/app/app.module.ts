import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routes/app-routing/app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { MasterLayoutComponent } from './components/master-layout/master-layout.component';

import { AuthenticationModule } from './components/authentication/authentication.module';
import { CustomerModule } from './components/customer/customer.module';
import { AuthenticationLayoutComponent } from './components/authentication-layout/authentication-layout.component';
import { CustomerRoutingModule } from './routes/app-routing/customer-routing.module';

@NgModule({
  declarations: [
    LayoutComponent,
    MasterLayoutComponent,
    AuthenticationLayoutComponent,
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
export class AppModule {}
