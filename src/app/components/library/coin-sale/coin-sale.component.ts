import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin } from 'rxjs';
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
  tokenBalance: number = 0;

  constructor(private wallet: WalletService) {
      wallet.walletAddress.subscribe((address: string) => this.onWalletAddressChange(address));
      combineLatest([wallet.walletAddress, wallet.networkId]).subscribe(([walletAddress, networkId]) => {
        console.log(walletAddress + ' : ' + networkId );
        if(walletAddress && networkId){
          this.getTokenBalance();
        }
      });
  }

  ngOnInit(): void {
    
  }

  toChange(ev: any): void {
    this.fromVal = this.toVal * this.tokenValue;
  }

  fromChange(ev: any): void {
    this.toVal = this.fromVal / this.tokenValue;
  }

  onWalletAddressChange(address: string)
  {
    if(address != ''){
      //console.log('address: ' + address);
      this.wallet.getBalance().then((balance: number) => this.ethBalance = balance);
    }
  }

  getTokenBalance()
  {
    this.wallet.getTokenBalance().then((balance: number) => this.tokenBalance = balance);
  }

}
