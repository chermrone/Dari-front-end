import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AdComponent} from './components/ad/ad.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
// @ts-ignore
import {RegisterComponent} from './components/register/register.component';
// @ts-ignore
import {LoginComponent} from './components/login/login.component';
import {AppComponent} from './app.component';
import {SubscriptionComponent} from './components/subscription/subscription.component';
import {AddAdComponent} from './components/add-ad/add-ad.component';
import {UserComponent} from './components/user/user.component';
import {UsermanagementComponent} from './components/usermanagement/usermanagement.component';
import {AdManagAdminComponent} from './components/ad-manag-admin/ad-manag-admin.component';
import {SubscriptionOrderManagementComponent} from './components/subscription-order-management/subscription-order-management.component';
import {ClaimsmanagementComponent} from './components/claimsmanagement/claimsmanagement.component';
import {OffersComponent} from './components/offers/offers.component';
import {SuccessComponent} from './components/success/success.component';
import {CancelComponent} from './components/cancel/cancel.component';
import {UsermanagementguardGuard} from "./routeGuard/usermanagementguard.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Product', component: AdComponent},
  {path: 'Product/:adId', component: AdComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'app', component: AppComponent},
  {path: 'loggedin',   redirectTo: 'app', pathMatch: 'full' },
  {path: 'subscription', component: SubscriptionComponent},
  {path: 'Ad/Add', component: AddAdComponent},
  {path: 'user', component: UserComponent},
  {path: 'managuser', component: UsermanagementComponent, canActivate : [UsermanagementguardGuard ]  },
  {path: 'managad', component: AdManagAdminComponent},
  {path: 'managclaim', component: ClaimsmanagementComponent},
  {path: 'sordmanag', component: SubscriptionOrderManagementComponent},
  {path: 'offers', component: OffersComponent},
  {path: 'checkout', component: CheckoutComponent},
  { path: 'cancel', component: CancelComponent },
  { path: 'success', component: SuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
