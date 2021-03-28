import {Component, OnInit} from '@angular/core';
import {PriceService} from '../../services/price.service';
import {HighlightedStock} from '../../models/HighlightedStock';

@Component({
  selector: 'app-overview-highlighted-prices',
  templateUrl: './overview-highlighted-prices.component.html',
  styleUrls: ['./overview-highlighted-prices.component.css']
})


export class OverviewHighlightedPricesComponent implements OnInit {

  highlightedStocks: HighlightedStock[];

  constructor(private priceService: PriceService
  ) {
  }

  ngOnInit(): void {
    this.priceService.evaluatePrices()
      .subscribe(data => {
        this.highlightedStocks = data;
        console.log(data);
      });
  }


}


