import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverviewStocksComponent} from './stocks/overview-stocks/overview-stocks.component';
import {ManageStocksComponent} from './stocks/manage-stocks/manage-stocks.component';
import {OverviewPricesComponent} from './prices/overview-prices/overview-prices.component';
import {OverviewHighlightedPricesComponent} from './prices/overview-highlighted-prices/overview-highlighted-prices.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuardService} from './helper/auth-guard.service';

const routes: Routes = [
  {path: 'stocks', component: OverviewStocksComponent, canActivate: [AuthGuardService]},
  {path: 'manage-stocks', component: ManageStocksComponent, canActivate: [AuthGuardService]},
  {path: 'prices', component: OverviewPricesComponent, canActivate: [AuthGuardService]},
  {path: 'highlighted-prices', component: OverviewHighlightedPricesComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [OverviewStocksComponent, LoginComponent];

