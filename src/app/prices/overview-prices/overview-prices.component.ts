import {Component, OnInit} from '@angular/core';
import {PriceService} from '../../services/price.service';
import {Stock} from '../../models/Stock';
import {StockService} from '../../services/stock.service';


export interface PeriodicElement {
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

];


@Component({
  selector: 'app-overview-prices',
  templateUrl: './overview-prices.component.html',
  styleUrls: ['./overview-prices.component.css']
})



export class OverviewPricesComponent implements OnInit{
  stocks: Stock[];
  myPrices: number[];
  arraySize: number;

  displayedColumns: string[] = ['date'];
  dataSource = ELEMENT_DATA;

  constructor(private stockService: StockService, private priceService: PriceService
  ) {
  }

  ngOnInit(): void {
    this.stockService.getAllStocks()
      .subscribe(data => {
        console.log(data);
        this.stocks = data;
        this.getAllPrices(this.stocks);
      });


  }

  getAllPrices(stocks: Stock[]): void {
    stocks.forEach(s => {
      this.priceService.getAllPrices(s.id)
        .subscribe(data => {
          s.prices = data;

          this.dataSource = data;
        });
    });
  }



}


