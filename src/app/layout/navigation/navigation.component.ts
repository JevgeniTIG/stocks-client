import {Component, OnInit} from '@angular/core';
import {PriceService} from '../../services/price.service';
import {Stock} from '../../models/Stock';
import {User} from '../../models/User';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = false;
  user: User;

  highlightedStocks: Stock[];

  constructor(private tokenService: TokenStorageService,
              private priceService: PriceService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if (this.isLoggedIn) {
      this.priceService.evaluatePrices()
        .subscribe(data => {
          this.highlightedStocks = data;
          console.log(data);
        });
    }
  }


  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['']);
  }


  refresh(): void {
    window.location.reload();
  }

}
