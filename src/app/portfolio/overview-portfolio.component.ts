import {Component, OnInit} from '@angular/core';
import {InvestorService} from '../services/investor.service';
import {Portfolio} from '../models/Portfolio';
import {PortfolioPosition} from '../models/PortfolioPosition';
import {LEFT_ARROW, NUM_CENTER} from '@angular/cdk/keycodes';
import {StockService} from '../services/stock.service';
import {Stock} from '../models/Stock';


@Component({
  selector: 'app-overview-portfolio',
  templateUrl: './overview-portfolio.component.html',
  styleUrls: ['./overview-portfolio.component.css']
})


export class OverviewPortfolioComponent implements OnInit {


  constructor(private investorService: InvestorService,
              private stockService: StockService
  ) {
  }

  portfolio: Portfolio;
  investmentAmount: number;
  optionsPie: any;
  optionsBar: any;
  positions: any[] = [];
  positionsX: any[] = [];
  positionsYInititalAmount: any[] = [];
  positionsYAmountWithProfit: any[] = [];
  stockList: any[] = [];
  minPricesList: any[] = [];
  maxPricesList: any[] = [];


  ngOnInit(): void {
    this.investmentAmount = 100;
    this.getInvestorProfile(this.investmentAmount);
  }

  getInvestorProfile(investmentAmount: number): void {
    this.investorService.getInvestorProfile(investmentAmount)
      .subscribe(data => {
        this.portfolio = data;
        this.setOptionsPieChart(data.portfolioPositions, investmentAmount);
        this.setOptionsBarChart(data.portfolioPositions, investmentAmount);
      });
  }

  getMinAndMaxPriceOfStock(data: any): Stock [] {
    data.forEach(stock => {
      this.stockService.getStockByTicker(stock.ticker)
        .subscribe(stockData => {
          this.stockList.push(stockData);
        });
    });
    return this.stockList;
  }

  setOptionsPieChart(chartData: PortfolioPosition [], investmentAmount): void {
    chartData.forEach(pos => {
      this.positions.push({name: pos.ticker, value: (pos.profitability + investmentAmount).toFixed(2)});
    });

    this.optionsPie = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '55%'],
          data: this.positions,
          label: {
            show: false
          },

          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

  }


  setOptionsBarChart(chartData: PortfolioPosition [], investmentAmount): void {

    chartData.forEach(pos => {
      this.positionsX.push(pos.ticker);
      this.positionsYInititalAmount.push(investmentAmount);
      this.positionsYAmountWithProfit.push((investmentAmount + pos.profitability).toFixed(2));
    });
    this.getMinAndMaxPriceOfStock(chartData).forEach(s => {
      if (s.currency === 'EUR') {
        this.minPricesList.push(s.minPrice);
        this.maxPricesList.push(s.maxPrice);
      } else if (s.currency === 'USD') {
        this.minPricesList.push((s.minPrice * 0.84).toFixed(2));
        this.maxPricesList.push((s.maxPrice * 0.84).toFixed(2));
      } else if (s.currency === 'SEK') {
        this.minPricesList.push((s.minPrice * 0.098).toFixed(2));
        this.maxPricesList.push((s.maxPrice * 0.098).toFixed(2));
      }

    });

    this.optionsBar = {
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        show: true,
        left: 200,
        feature: {
          magicType: {show: true, type: ['line', 'bar']},

        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: this.positionsX,
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Current Value',
          type: 'bar',
          data: this.positionsYAmountWithProfit,
        },
        {
          name: 'Initial Value',
          type: 'bar',
          data: this.positionsYInititalAmount,
        },
        {
          name: 'Year Min, EUR',
          type: 'line',
          data: this.minPricesList,
        },
        {
          name: 'Year Max, EUR',
          type: 'line',
          data: this.maxPricesList,
        }
      ]
    };
  }


  updatePortfolio(amount): any {
    this.investmentAmount = amount;
    this.getInvestorProfile(amount);
    this.positions = [];
    this.positionsX = [];
    this.positionsYInititalAmount = [];
    this.positionsYAmountWithProfit = [];
    this.minPricesList = [];
    this.maxPricesList = [];

  }


  formatLabel(value: number): any {
    this.investmentAmount = value;
    return value;
  }

}


