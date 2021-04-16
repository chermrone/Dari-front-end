import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ProductComponent} from './components/product/product.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
// @ts-ignore
import {RegisterComponent} from './components/register/register.component';
// @ts-ignore
import {LoginComponent} from './components/login/login.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Product', component: ProductComponent},
  {path: 'Product/:adId', component: ProductComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'app', component: AppComponent},
  { path: 'loggedin',   redirectTo: 'app', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
