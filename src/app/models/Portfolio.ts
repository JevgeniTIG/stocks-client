import {PortfolioPosition} from './PortfolioPosition';

export interface Portfolio {
  totalValue: number;
  initialInvestmentAmountTotal: number;
  portfolioPositions: PortfolioPosition [];
  totalProfitability: number;
  totalProfitabilityInPercent: number;
}
