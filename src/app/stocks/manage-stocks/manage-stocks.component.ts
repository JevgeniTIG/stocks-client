import {Component, OnInit} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {Stock} from '../../models/Stock';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddStockCompanyInfoComponent} from '../add-stock-company-info/add-stock-company-info.component';

@Component({
  selector: 'app-manage-stocks',
  templateUrl: './manage-stocks.component.html',
  styleUrls: ['./manage-stocks.component.css']
})


export class ManageStocksComponent implements OnInit {

  stocks: Stock[];


  constructor(private stockService: StockService,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {

    this.stockService.getAllStocks()
      .subscribe(data => {
        console.log(data);
        this.stocks = data;
      });
  }

  createStock(ticker: string): void {
    this.stockService.createStock(ticker)
      .subscribe(data => {
        this.notificationService.showSnackBar('Stock added');
        setTimeout(() => {
          this.reload();
        }, 2000);
      }, error => {
        this.notificationService.showSnackBar('Something went wrong');
      });
  }

  deleteStock(id: number): void {
    const result = confirm('Do you really want to delete this stock?');
    if (result) {
      this.stockService.deleteStock(id)
        .subscribe(() => {
          this.notificationService.showSnackBar('Stock deleted');
          setTimeout(() => {
            this.reload();
          }, 2000);
        });
    }
  }


  openAddStockInfoDialog(stock: Stock): void {
    const dialogAddStockCompanyInfoConfig = new MatDialogConfig();
    dialogAddStockCompanyInfoConfig.width = '400px';
    dialogAddStockCompanyInfoConfig.data = stock;
    this.dialog.open(AddStockCompanyInfoComponent, dialogAddStockCompanyInfoConfig);
  }


  reload(): void {
    window.location.reload();
  }


}


