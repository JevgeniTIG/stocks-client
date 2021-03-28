import {Component, OnInit} from '@angular/core';
import {PriceService} from '../../services/price.service';
import {Stock} from '../../models/Stock';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  highlightedStocks: Stock[];

  constructor(private priceService: PriceService) {
  }

  ngOnInit(): void {
    this.priceService.evaluatePrices()
      .subscribe(data => {
        this.highlightedStocks = data;
        console.log(data);
      });
  }


  refresh(): void {
    window.location.reload();
  }

}
