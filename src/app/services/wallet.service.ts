import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { abi } from './data/contract-abi';
const { ethereum } = (window as any);


@Injectable({
  providedIn: 'root'
})
export class WalletService {

  web3: any;
  hasWallet: boolean = false;
  walletConnected = new BehaviorSubject<boolean>(false);
  walletAddress = new BehaviorSubject<string>('');
  networkId = new BehaviorSubject<string>('');
  isValidNetwork = new BehaviorSubject<boolean>(false);
  decimals: number = 18;
  userCurrencyBalance = new BehaviorSubject<number>(0);
  userTokenBalance = new BehaviorSubject<number>(0);
  contractTokenBalance = new BehaviorSubject<number>(0);

  contract: any = {
    'Ropstein' : '0xb0988e5a488fa7c6f183beab53bc4a40804d27de',
    'Binance Smart Chain': '0x9A8Db54d267EE98E28eF5bE10686D64216eb92aC'
  };

  networks: any = {
    '0x3': 'Ropstein',
    '0x38': 'Binance Smart Chain'
  }

  constructor() {
    this.hasWallet = ethereum && ethereum.isMetaMask;
    this.web3 = new Web3(ethereum);
    this.startEventWatchers();
    this.checkWalletConnected();
  }

  async connect()
  {
    if(this.hasWallet){
      ethereum.request({method: 'eth_requestAccounts'})
        .then((res: any) => {
          console.log(res);
          this.walletAddress.next(res[0]);
        });

      this.walletConnected.next(true);
    }else{
      alert('No BSC wallet detected.');
      this.hasWallet = false;
      this.walletConnected.next(false);
    }
  }

  async getChainId()
  {
    ethereum.request({method: 'eth_chainId'})
      .then((chainId: string) => {
        console.log(chainId);
        if(this.networkId != this.networks[chainId]){
          this.onChainChange(chainId);
        }
      });
  }

  onChainChange(chainId: string)
  {
    if(typeof(this.networks[chainId]) != 'undefined'){
      this.networkId.next(this.networks[chainId]);
      //this.connect();
    }else{
      this.networkId.next('');
      this.isValidNetwork.next(false);
    }
    
  }

  async startEventWatchers()
  {
    ethereum.on("accountsChanged", (accounts: any) => {
      console.log('accounts changed');
      this.walletAddress.next(accounts[0]);
    });

    ethereum.on("chainChanged", (res: any) => {
      console.log('chain changed');
      console.log(res);
      this.onChainChange(res);
    });

    ethereum.on('disconnect', () => {
      console.log('wallet disconnected');
      this.afterDisconnect();
    });
  }

  async disconnect() 
  {
    this.afterDisconnect();
  }

  afterDisconnect()
  {
    this.walletConnected.next(false);
    this.walletAddress.next('');
    this.networkId.next('');

  }
  
  getBalance(): Promise<number> {
    return this.web3.eth.getBalance(this.walletAddress.getValue())
      .then((res: number) => {
        if(res > 0){
          return res / Math.pow(10, this.decimals);
        }else{
          return 0;
        }
      });
  }

  getTokenBalance()
  {
    console.log('getting token balance for: ' + this.contract[this.networkId.getValue()]);
    let contract = new this.web3.eth.Contract(abi, this.contract[this.networkId.getValue()]);

    return contract.methods.balanceOf(this.walletAddress.getValue()).call().then((bal: any) => {
      console.log(bal);
      return bal / Math.pow(10, this.decimals);
    });
  }

  checkWalletConnected()
  {
    return this.web3.eth.getAccounts()
      .then((res: any) => {
        if(res.length > 0){
          console.log(res);
          this.walletAddress.next(res[0]);
          this.walletConnected.next(true);
          this.getChainId();
          this.startEventWatchers();
          return true;
        }
        return false;
      })
      .catch((err: any) => {console.log(err)})
  }
  
}
