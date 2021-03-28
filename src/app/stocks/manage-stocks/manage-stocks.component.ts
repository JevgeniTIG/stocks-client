import {Component, OnInit} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {Stock} from '../../models/Stock';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-stocks',
  templateUrl: './manage-stocks.component.html',
  styleUrls: ['./manage-stocks.component.css']
})


export class ManageStocksComponent implements OnInit {

  stocks: Stock[];

  constructor(private stockService: StockService,
              private notificationService: NotificationService,
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

  reload(): void {
    window.location.reload();
  }


}


