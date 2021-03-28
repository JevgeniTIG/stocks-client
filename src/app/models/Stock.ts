import {Price} from './Price';

export interface Stock {
  id: number;
  ticker: string;
  currency: string;
  stockExchange: string;
  companyName: string;
  createdDate: string;
  minPrice: number;
  maxPrice: number;
  companyInfo?: string;
  prices?: Price [];
}
