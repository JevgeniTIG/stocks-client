import {Component, OnInit} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {Stock} from '../../models/Stock';
import {NotificationService} from '../../services/notification.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddStockCompanyInfoComponent} from '../add-stock-company-info/add-stock-company-info.component';
import {User} from '../../models/User';
import {TokenStorageService} from '../../services/token-storage.service';
import {UserService} from '../../services/user.service';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-manage-stocks',
  templateUrl: './manage-stocks.component.html',
  styleUrls: ['./manage-stocks.component.css']
})


export class ManageStocksComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false;
  user: User;

  stocks: Stock[];


  constructor(private stockService: StockService,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private tokenService: TokenStorageService,
              private userService: UserService,
              private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenService.getToken();

    this.stockService.getAllStocks()
      .subscribe(data => {
        console.log(data);
        this.stocks = data;
      });

    if (this.isLoggedIn) {
      this.userService.getCurrentUser()
        .subscribe(data => {
          this.user = data;
          this.isDataLoaded = true;
        });
    }
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
    if (this.deviceService.isMobile()) {
      dialogAddStockCompanyInfoConfig.width = '300px';
    }
    else {
      dialogAddStockCompanyInfoConfig.width = '400px';
    }
    dialogAddStockCompanyInfoConfig.data = stock;
    this.dialog.open(AddStockCompanyInfoComponent, dialogAddStockCompanyInfoConfig);
  }


  reload(): void {
    window.location.reload();
  }


}


