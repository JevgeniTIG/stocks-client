import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {conf} from '../config/conf';


const INVESTOR_API = conf.host + 'api/investor/';


@Injectable({
  providedIn: 'root'
})
export class InvestorService {

  constructor(private http: HttpClient) {
  }

  getInvestorProfile(amount: number): Observable<any> {
    return this.http.post(INVESTOR_API + amount + '/get', null);
  }

}
