import {Component, OnInit} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {Stock} from '../../models/Stock';
import {OverviewStockCompanyInfoComponent} from '../overview-stock-company-info/overview-stock-company-info.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-overview-stocks',
  templateUrl: './overview-stocks.component.html',
  styleUrls: ['./overview-stocks.component.css']
})



export class OverviewStocksComponent implements OnInit{

  stocks: Stock[];
  stock: Stock;

  constructor(private stockService: StockService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.stockService.getAllStocks()
      .subscribe(data => {
        console.log(data);
        this.stocks = data;
      });
  }

  openStockInfoDialog(stock: Stock): void {
    const dialogOverviewStockCompanyInfoConfig = new MatDialogConfig();
    dialogOverviewStockCompanyInfoConfig.width = '400px';
    dialogOverviewStockCompanyInfoConfig.data = stock;
    this.dialog.open(OverviewStockCompanyInfoComponent, dialogOverviewStockCompanyInfoConfig);
  }



}


