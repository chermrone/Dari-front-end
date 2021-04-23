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

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import {MaterialModule} from './material/material.module';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import {VerifAuthService} from './services/verif-auth.service';
import { UsermanagementComponent } from './components/usermanagement/usermanagement.component';
import { AdManagAdminComponent } from './components/ad-manag-admin/ad-manag-admin.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { SubscriptionFormComponent } from './components/subscription-form/subscription-form.component';
import { SubscriptionOrderManagementComponent } from './components/subscription-order-management/subscription-order-management.component';
import { ModifAdComponent } from './components/modif-ad/modif-ad.component';
import { ClaimsmanagementComponent } from './components/claimsmanagement/claimsmanagement.component';
import { ClaimsupdateComponent } from './components/claimsupdate/claimsupdate.component';
import { SubscriptionorderFormComponent } from './components/subscriptionorder-form/subscriptionorder-form.component';
import { OffersComponent } from './components/offers/offers.component';
import {LoginComponent} from "./components/login/login.component";






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
    AddAdComponent,
    UsermanagementComponent,
    AdManagAdminComponent,
    UserAddComponent,
    SubscriptionFormComponent,
    SubscriptionOrderManagementComponent,
    ModifAdComponent,

    ClaimsmanagementComponent,
    ClaimsupdateComponent,

    SubscriptionorderFormComponent,
      OffersComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders, VerifAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
