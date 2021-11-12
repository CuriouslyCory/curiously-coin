import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { WalletService } from '../../../services/wallet.service';

@Component({
  selector: 'app-coin-sale',
  templateUrl: './coin-sale.component.html',
  styleUrls: ['./coin-sale.component.scss']
})
export class CoinSaleComponent implements OnInit {

  fromVal: number = 0.0;
  toVal: number = 0.0;
  tokenValue: number = 0.5;
  ethBalance: number = 0;

  constructor(private wallet: WalletService) {
      wallet.walletAddress.subscribe((address: string) => this.newWalletAddress(address));
  }

  ngOnInit(): void {
    
  }

  toChange(ev: any): void {
    this.fromVal = this.toVal * this.tokenValue;
  }

  fromChange(ev: any): void {
    this.toVal = this.fromVal / this.tokenValue;
  }

  newWalletAddress(address: string)
  {
    if(address != ''){
      console.log('address: ' + address);
      this.wallet.getBalance()
      .then((balance: any) => this.ethBalance = balance);
    }
  }

}
