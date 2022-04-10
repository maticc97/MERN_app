import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthenticationLayoutComponent } from './components/authentication-layout/authentication-layout.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';

import { AppRoutingModule } from './routes/app-routing/app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [AuthenticationLayoutComponent, LayoutComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [LayoutComponent],
})
export class AppModule {}
