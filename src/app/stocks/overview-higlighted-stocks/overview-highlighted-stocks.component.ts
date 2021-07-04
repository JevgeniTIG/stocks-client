import {Component, OnInit} from '@angular/core';
import {PriceService} from '../../services/price.service';
import {HighlightedStock} from '../../models/HighlightedStock';

@Component({
  selector: 'app-overview-highlighted-stocks',
  templateUrl: './overview-highlighted-stocks.component.html',
  styleUrls: ['./overview-highlighted-stocks.component.css']
})

export class OverviewHighlightedStocksComponent implements OnInit {
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


