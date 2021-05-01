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
// @ts-ignore
import {OffersComponent} from './components/offers/offers.component';
// @ts-ignore
import {SuccessComponent} from './components/success/success.component';
import {CancelComponent} from './components/cancel/cancel.component';
// @ts-ignore
import {UsermanagementguardGuard} from './routeGuard/usermanagementguard.guard';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {RessetpasswordComponent} from "./components/ressetpassword/ressetpassword.component";
import {FounitureAdComponent} from './components/founiture-ad/founiture-ad.component';
import {AdOwnedComponent} from "./components/ad-owned/ad-owned.component";
import {SellComponent} from "./components/sell/sell.component";
import {RentComponent} from "./components/rent/rent.component";
import {GetfavoComponent} from "./components/getfavo/getfavo.component";
import {ChatComponent} from "./components/chat/chat.component";
import {DisplaySearchAdComponent} from "./components/display-search-ad/display-search-ad.component";
import {AssuranceComponent} from './components/assurance/assurance.component';
import {SurveillanceDeMaisonComponent} from './components/surveillance-de-maison/surveillance-de-maison.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Product', component: AdComponent},
  {path: 'ad/:id', component: AdComponent},
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
  { path: 'success', component: SuccessComponent },
  { path: 'statistics', component: StatisticsComponent},
  {path: 'reset' , component: RessetpasswordComponent},
  {path: 'fournitureAd' , component: FounitureAdComponent},
  {path: 'adOwned', component: AdOwnedComponent},
  {path: 'sell', component: SellComponent},
  {path: 'rent', component: RentComponent},
  {path: 'getfav', component: GetfavoComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'SearchAd', component: DisplaySearchAdComponent},
  {path: 'assurance', component: AssuranceComponent},
  {path: 'surveillance_de_maison', component: SurveillanceDeMaisonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
