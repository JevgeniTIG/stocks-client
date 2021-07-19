import {Component, OnInit} from '@angular/core';
import {InvestorService} from '../services/investor.service';
import {Portfolio} from '../models/Portfolio';
import {PortfolioPosition} from '../models/PortfolioPosition';
import {StockService} from '../services/stock.service';
import {PriceService} from '../services/price.service';
import {MinMaxCurrent} from '../models/MinMaxCurrent';
import {color} from 'echarts';


@Component({
  selector: 'app-overview-portfolio',
  templateUrl: './overview-portfolio.component.html',
  styleUrls: ['./overview-portfolio.component.css']
})


export class OverviewPortfolioComponent implements OnInit {


  constructor(private investorService: InvestorService,
              private stockService: StockService,
              private priceService: PriceService
  ) {
  }

  portfolio: Portfolio;
  investmentAmount: number;
  optionsPie: any;
  optionsBar: any;
  optionsBarMinMaxCurrent: any;
  positions: any[] = [];
  positionsX: any[] = [];
  positionsYInititalAmount: any[] = [];
  positionsYAmountWithProfit: any[] = [];
  stockList: any[] = [];
  minPricesList: any[] = [];
  maxPricesList: any[] = [];
  currentPricesList: any [] = [];
  stocks: any [] = [];
  profitOfStock: any [] = [];


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
    this.priceService.getMinMaxCurrent().subscribe(data => {
      this.setOptionsBarChartMinMaxCurrent(data);
    });
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
      this.profitOfStock.push(pos.profitability.toFixed(2));
    });

    this.optionsBar = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Current Value', 'Initial Value'],
        left: 20,
        textStyle: {
          color: '#CAECC8',
        }
      },
      toolbox: {
        show: true,
        left: 240,
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
          name: 'Profit',
          type: 'line',
          data: this.profitOfStock,
        }
      ]
    };
  }


  setOptionsBarChartMinMaxCurrent(chartData: MinMaxCurrent []): void {

    this.optionsBarMinMaxCurrent = {
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
          data: chartData.map(stock => stock.ticker),
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [

        {
          name: 'Year Min',
          type: 'line',
          data: chartData.map(stock => stock.minPrice),
        },
        {
          name: 'Year Max',
          type: 'line',
          data: chartData.map(stock => stock.maxPrice),
        },
        {
          name: 'Current Price',
          type: 'line',
          data: chartData.map(stock => stock.currentValue)
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
    this.currentPricesList = [];
    this.profitOfStock = [];

  }


  formatLabel(value: number): any {
    this.investmentAmount = value;
    return value;
  }

}


