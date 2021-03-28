import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverviewStocksComponent} from './stocks/overview-stocks/overview-stocks.component';
import {ManageStocksComponent} from './stocks/manage-stocks/manage-stocks.component';
import {OverviewPricesComponent} from './prices/overview-prices/overview-prices.component';
import {OverviewHighlightedPricesComponent} from './prices/overview-highlighted-prices/overview-highlighted-prices.component';

const routes: Routes = [
  {path: 'stocks', component: OverviewStocksComponent},
  {path: 'manage-stocks', component: ManageStocksComponent},
  {path: 'prices', component: OverviewPricesComponent},
  {path: 'highlighted-prices', component: OverviewHighlightedPricesComponent},
  {path: '', component: OverviewStocksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [OverviewStocksComponent];

