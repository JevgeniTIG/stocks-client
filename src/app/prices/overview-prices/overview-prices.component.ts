import {Component, OnInit} from '@angular/core';
import {PriceService} from '../../services/price.service';
import {Stock} from '../../models/Stock';
import {StockService} from '../../services/stock.service';


@Component({
  selector: 'app-overview-prices',
  templateUrl: './overview-prices.component.html',
  styleUrls: ['./overview-prices.component.css']
})


export class OverviewPricesComponent implements OnInit {


  constructor(private stockService: StockService, private priceService: PriceService
  ) {
  }

  stocks: Stock[];
  arraySize: number;
  charts: any = [];
  tableView: boolean;


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

          const option = {
            grid: {
              left: '34px'
            },
            color: ['#0EB200'],
            textStyle: {
              fontSize: 13,
              color: '#CAECC8',
            },

            title: {
              text: 'STOCK: ' + s.ticker + '      CURRENCY: ' + s.currency,
              textStyle: {
                fontFamily: 'Avenir /, Raanana !important',
                color: '#0EB200'
              }
            },
            tooltip: {
              trigger: 'axis',
              backgroundColor: 'rgba(0,0,0,0.75)',
              padding: [10, 15],
              textStyle: {
                fontSize: 13,
                fontFamily: 'Roboto, sans-serif'
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: s.prices.map(p => p.createdDate.toString().substring(5, 10))
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: s.prices.map(p => p.price),
              type: 'line',
              areaStyle: {
                color: 'none'
              },

            }]
          };
          this.charts.push(option);

        });
    });
  }

  switchToTableView(): void {
    this.tableView = true;
  }

  switchToChartView(): void {
    this.tableView = false;
  }


}


