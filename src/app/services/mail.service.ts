import {conf} from '../config/conf';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const MAIL_API = conf.host + 'api/mail/';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) {
  }


  sendMail(): Observable<any> {
    return this.http.post(MAIL_API + 'send', null);
  }

}
