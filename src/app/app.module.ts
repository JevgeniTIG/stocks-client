import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MaterialModule} from './material-module';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import {LayoutModule} from '@angular/cdk/layout';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OverviewStocksComponent} from './stocks/overview-stocks/overview-stocks.component';
import {ManageStocksComponent} from './stocks/manage-stocks/manage-stocks.component';
import {OverviewPricesComponent} from './prices/overview-prices/overview-prices.component';
import {OverviewHighlightedPricesComponent} from './prices/overview-highlighted-prices/overview-highlighted-prices.component';
import { OverviewStockCompanyInfoComponent } from './stocks/overview-stock-company-info/overview-stock-company-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    OverviewStocksComponent,
    ManageStocksComponent,
    OverviewPricesComponent,
    OverviewHighlightedPricesComponent,
    routingComponents,
    OverviewStockCompanyInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MaterialModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
