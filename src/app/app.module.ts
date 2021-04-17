import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { AdComponent } from './components/ad/ad.component';
import {HttpClientModule} from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import {MaterialModule} from './material/material.module';
import { AddAdComponent } from './add-ad/add-ad.component';
import {VerifAuthService} from "./services/verif-auth.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    AdComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    SubscriptionComponent,
    AddAdComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers: [httpInterceptorProviders,VerifAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
