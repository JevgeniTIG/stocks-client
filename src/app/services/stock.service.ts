import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {conf} from '../config/conf';


const STOCK_API = conf.host + 'api/stock/';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {
  }

  createStock(ticker: string): Observable<any> {
    return this.http.post(STOCK_API + ticker + '/create', null);
  }

  getAllStocks(): Observable<any> {
    return this.http.get(STOCK_API + 'all');
  }

  deleteStock(id: number): Observable<any> {
    return this.http.post(STOCK_API + id + '/delete', null);
  }



}
