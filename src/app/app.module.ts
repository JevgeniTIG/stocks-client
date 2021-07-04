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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OverviewStocksComponent} from './stocks/overview-stocks/overview-stocks.component';
import {ManageStocksComponent} from './stocks/manage-stocks/manage-stocks.component';
import {OverviewPricesComponent} from './prices/overview-prices/overview-prices.component';
import { OverviewStockCompanyInfoComponent } from './stocks/overview-stock-company-info/overview-stock-company-info.component';
import {authInterceptorProviders} from './helper/auth-interceptor.service';
import {authErrorInterceptorProviders} from './helper/error-interceptor.service';
import {OverviewHighlightedStocksComponent} from './stocks/overview-higlighted-stocks/overview-highlighted-stocks.component';
import {AddStockCompanyInfoComponent} from './stocks/add-stock-company-info/add-stock-company-info.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxEchartsModule} from 'ngx-echarts';
import * as echarts from 'echarts';
import {OverviewPortfolioComponent} from './portfolio/overview-portfolio.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    OverviewStocksComponent,
    ManageStocksComponent,
    OverviewPricesComponent,
    OverviewHighlightedStocksComponent,
    routingComponents,
    OverviewStockCompanyInfoComponent,
    AddStockCompanyInfoComponent,
    OverviewPortfolioComponent
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
    MatTooltipModule,
    NgxEchartsModule.forRoot({
      echarts
    })
  ],
  providers: [authInterceptorProviders, authErrorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
