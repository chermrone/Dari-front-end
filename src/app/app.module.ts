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
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import {MaterialModule} from './material/material.module';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import {VerifAuthService} from "./services/verif-auth.service";
import { UsermanagementComponent } from './components/usermanagement/usermanagement.component';
import { AdManagAdminComponent } from './components/ad-manag-admin/ad-manag-admin.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { SubscriptionFormComponent } from './components/subscription-form/subscription-form.component';
import { SubscriptionOrderManagementComponent } from './components/subscription-order-management/subscription-order-management.component';
import { ModifAdComponent } from './components/modif-ad/modif-ad.component';
import {NbChatModule, NbThemeModule, NbLayoutModule, NbCardModule, NbInputModule, NbButtonModule} from "@nebular/theme";
import {WebsocketService} from "./services/websocket.service";
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChatComponent } from './chat/chat.component';



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
    ChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NbChatModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule
  ],
  providers: [httpInterceptorProviders, VerifAuthService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
