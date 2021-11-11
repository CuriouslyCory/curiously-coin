import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coin-sale',
  templateUrl: './coin-sale.component.html',
  styleUrls: ['./coin-sale.component.scss']
})
export class CoinSaleComponent implements OnInit {

  fromVal: number = 0.0;
  toVal: number = 0.0;
  tokenValue: number = 0.5;

  constructor() { }

  ngOnInit(): void {
  }

  toChange(ev: any): void {
    this.fromVal = this.toVal * this.tokenValue;
  }

  fromChange(ev: any): void {
    this.toVal = this.fromVal / this.tokenValue;
  }

}
