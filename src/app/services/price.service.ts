import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {conf} from '../config/conf';


const PRICE_API = conf.host + 'api/price/';


@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http: HttpClient) {
  }

  getAllPrices(id: number): Observable<any> {
    return this.http.get(PRICE_API + id + '/all');
  }

  evaluatePrices(): Observable<any> {
    return this.http.post(PRICE_API + 'evaluate', null);
  }

  getMinMaxCurrentPurchase(): Observable<any> {
    return this.http.get(PRICE_API + 'minmaxcurrentpurchase');
  }

}
