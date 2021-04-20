import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Stock} from '../../models/Stock';
import {StockService} from '../../services/stock.service';
import {NotificationService} from '../../services/notification.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-stock-company-info',
  templateUrl: './add-stock-company-info.component.html',
  styleUrls: ['./add-stock-company-info.component.css']
})
export class AddStockCompanyInfoComponent implements OnInit {

  stock: Stock;
  public addInfoForm: FormGroup;


  constructor(private dialogRef: MatDialogRef<AddStockCompanyInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private stockService: StockService,
              private notificationService: NotificationService,) {
  }

  ngOnInit(): void {
  }

  submit(companyInfo: string): void {

    if (companyInfo.length > 0) {
      this.data.companyInfo = companyInfo;
      this.stockService.addStockCompanyInfo(this.data.id, this.data)
        .subscribe(() => {
          this.notificationService.showSnackBar('Company info added');
          this.dialogRef.close();
        });
    }
    this.notificationService.showSnackBar('Field is empty');
  }


  reload(): void {
    window.location.reload();
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

}
