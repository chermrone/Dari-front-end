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
import {UsermanagementComponent} from "./components/usermanagement/usermanagement.component";

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
  {path: 'managuser', component: UsermanagementComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
