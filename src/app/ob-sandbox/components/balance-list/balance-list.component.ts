import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../model/account';
import { Amount } from '../../model/amount';
import { Balance } from '../../model/balance';
import { Lookup } from '../../model/lookup';
import { BalancesService } from '../../service/balances.service';
import { LookupService } from '../../service/lookup.service';
import { UserService } from '../../service/user-service.service';

@Component({
  selector: 'app-balance-list',
  templateUrl: './balance-list.component.html',
  styleUrls: ['./balance-list.component.css']
})
export class BalanceListComponent implements OnInit {

  static accountObj: any;
  balancesList: Balance[];
  showNewBalance = false;
  balance: Balance;
  balanceAmount: Amount;

  showSuccessMsg = false;
  showErrorMsg = false;

  currencyList: Lookup[];
  creditDebitList: Lookup[];
  balanceTypeList: Lookup[];
  showEditBalance = false;

  public account: Account = new Account();
  usersList: any;
  errorMesage: any;
  constructor(private router: Router,
              private balancesService: BalancesService,
              private lookupService: LookupService ,
              private userService: UserService) { }

  ngOnInit(): void {
    console.log('...in ngOnInit TransactionsListComponent ')
    this.account = BalancesService.accountObj;
    console.log('aaa this.account, ', this.account)
    // this.lookupService.getLookups();
    this.loadLookups();
      this.getbalancesList(this.account.AccountId) ;
  }

  getbalancesList(accoountId) {
    this.balancesService.getBalancesWithAccountId(accoountId).subscribe(data => {
      console.log('...in getbalancesList data= ', data)
      this.balancesList = data.Data.Balance;
      console.log('...in getbalancesList this.transactionsList= ', this.balancesList)
    });
  }


  getUsers() {
    this.userService.getUsers().subscribe(data => {
      console.log('...in getUsers data= ', data)
      console.log('...in getUsers usersList= ', data.Data.User)
      this.usersList = data.Data.User;
    });
  }
  addBalance(): void {
    // this.lookupService.getLookups();
    // setTimeout(() => console.log('waiting..') , 1000);
    // this.loadLookups();
    this.balance = new Balance();
    this.balanceAmount = new Amount();
    this.showNewBalance = true
    this.showEditBalance = false
  }
  saveBalance() {
    this.balance.Amount = this.balanceAmount;
    this.balance.userId = this.account.userId;
    this.balance.AccountId = BalanceListComponent.accountObj.AccountId;

    console.log('this.balance: ', this.balance)
    this.balancesService.saveBalance(this.balance).subscribe(data => {
      console.log('POST Request is successful ', data);
      this.showNewBalance = false
      this.showSuccessMsg = true;
      this.showErrorMsg = false;
      this.balancesList.push(this.balance);
      this.balance = new Balance();
      this.balanceAmount = new Amount();
    },
      error => {
        // this.showMsg=true;
        this.errorMesage = error.message;
        this.showErrorMsg = true;
        this.showSuccessMsg = false;
        console.log('Error...', error);
      }
    );
  }
  loadLookups() {
    this.currencyList = LookupService.currencyList;
    this.creditDebitList = LookupService.CreditDebitList;
    this.balanceTypeList = LookupService.balanceTypeList;
  }
  EditBalance(balance) {
    //  this.lookupService.getLookups();
    // setTimeout(() => console.log('waiting..') , 1000);
    // this.loadLookups();
    this.showEditBalance = true
    console.log('balance for edit: ', balance)
    this.balance = balance;
    this.balanceAmount = balance.Amount;
    this.showNewBalance = true

  }
  updateBalance() {
    this.balance.AccountId = BalanceListComponent.accountObj.AccountId;
    this.balance.Amount = this.balanceAmount;
    this.balance.userId = this.account.userId;

    console.log('this.balance: ', this.balance)
    this.balancesService.updateBalance(this.balance).subscribe(data => {
      console.log('Update Request is successful ', data);
      this.showNewBalance = false
      this.showSuccessMsg = true;
      this.showErrorMsg = false;
      this.balancesList.push(this.balance);
      this.balance = new Balance();
      this.balanceAmount = new Amount();
      // this.accountIdentification=new AccountIdentification();
    },
      error => {
        // this.showMsg=true;
        this.errorMesage = error.message;
        this.showErrorMsg = true;
        this.showSuccessMsg = false;
        console.log('Error...', error);
      }
    );
  }
  DeleteBalance(balanceId, index) {
    if (confirm('Are you sure to delete Balance ' + balanceId)) {

    }

  }

}
