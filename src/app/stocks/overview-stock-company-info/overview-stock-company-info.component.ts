import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Stock} from '../../models/Stock';

@Component({
  selector: 'app-overview-stock-company-info',
  templateUrl: './overview-stock-company-info.component.html',
  styleUrls: ['./overview-stock-company-info.component.css']
})
export class OverviewStockCompanyInfoComponent implements OnInit {

  stock: Stock;
  constructor(private dialogRef: MatDialogRef<OverviewStockCompanyInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
