import { Component, NgZone, OnInit } from '@angular/core';
import { WalletService } from '../../../services/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  walletConnected: boolean = false;
  mouseOver: boolean = false;
  network: any;
  isValidNetwork: boolean = false;

  constructor(private wallet: WalletService, private ngZone: NgZone) { 
    wallet.walletConnected.subscribe((isConnected: boolean) => this.updateConnectionStatus(isConnected));
    wallet.networkId.subscribe((networkId: string) => this.updateNetworkName(networkId));
    wallet.isValidNetwork.subscribe((isValidNetwork: boolean) => this.updateNetworkStatus(isValidNetwork));
  }

  ngOnInit(): void {
  }

  connectWallet(): void {
    this.wallet.connect();
  }
  
  disconnectWallet(): void {
    this.wallet.disconnect();
  }

  updateConnectionStatus(isConnected: boolean)
  {
    this.ngZone.run(() => {
      this.walletConnected = isConnected;
    });
  }

  updateNetworkName(networkName: string)
  {
    this.ngZone.run(() => {
      this.network = networkName;
    });
  }

  updateNetworkStatus(isValidNetwork: boolean)
  {
    this.ngZone.run(() => {
      this.isValidNetwork = isValidNetwork;
    });
  }

}
