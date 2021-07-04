import {Component, OnInit} from '@angular/core';
import {InvestorService} from '../services/investor.service';
import {Portfolio} from '../models/Portfolio';
import {PortfolioPosition} from '../models/PortfolioPosition';
import {LEFT_ARROW, NUM_CENTER} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-overview-portfolio',
  templateUrl: './overview-portfolio.component.html',
  styleUrls: ['./overview-portfolio.component.css']
})


export class OverviewPortfolioComponent implements OnInit {


  constructor(private investorService: InvestorService
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

  setOptionsPieChart(chartData: PortfolioPosition [], investmentAmount): void {
    chartData.forEach(pos => {
      this.positions.push({name: pos.ticker, value: (pos.profitability + investmentAmount).toFixed(2)});
      console.log(this.positions);
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
      this.positionsYAmountWithProfit.push(investmentAmount + pos.profitability);
      console.log(this.positionsX);
    });

    this.optionsBar = {
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        show: true,
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
        }
      ]
    };
  }


  updatePortfolio(amount): any {
    this.getInvestorProfile(amount);
    this.positions = [];
    this.positionsX = [];
    this.positionsYInititalAmount = [];
    this.positionsYAmountWithProfit = [];
  }


  formatLabel(value: number): any {
    this.investmentAmount = value;
    return value;
  }

}


