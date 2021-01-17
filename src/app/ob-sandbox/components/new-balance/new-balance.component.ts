import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Account} from '../../model/account';
import {Amount} from '../../model/amount';
import {Balance} from '../../model/balance';
import {Lookup} from '../../model/lookup';
import {AccountServiceService} from '../../service/account-service.service';
import {BalancesService} from '../../service/balances.service';
import {LookupService} from '../../service/lookup.service';
import {UserService} from '../../service/user-service.service';

@Component({
  selector: 'app-new-balance',
  templateUrl: './new-balance.component.html',
  styleUrls: ['./new-balance.component.css']
})
export class NewBalanceComponent implements OnInit {

  usersList: any;
  errorMesage: any;
  accountList: any;
  accountServiceObj: Account;
  balance: Balance = new Balance();
  balanceAmount: Amount = new Amount();

  showMsg = false;
  showSuccessMsg = false;
  showErrorMsg = false;

  userId: any;
  currencyList: Lookup[];
  creditDebitList: Lookup[];
  balanceTypeList: Lookup[];
  viewInListFlag = false;


  constructor(private router: Router, private lookupService: LookupService
    , private userService: UserService, private accountService: AccountServiceService
    , private balanceService: BalancesService) {  }

  ngOnInit(): void {
    this.getUsers();
    console.log('BalancesService.account: ', BalancesService.account)
    console.log('BalancesService.viewInListFlag: ', BalancesService.viewInListFlag)

    if (BalancesService.account != null || !BalancesService.account == undefined) {
      this.accountServiceObj = BalancesService.account;
      this.viewInListFlag = BalancesService.viewInListFlag;
      this.balance.AccountId = this.accountServiceObj.AccountId;
      this.userId = BalancesService.userId;
      this.getAccountList(this.userId)
    }
    console.log('this.balance: ', this.balance)

    this.lookupService.getLookups();
    setTimeout(() => console.log('waiting..') , 1000);
    this.loadLookups();
  }

  getAccountList(userId) {
    this.accountService.getAccountsWithUserId(userId).subscribe(data => {
     this.accountList = data.Data.Account;
     console.log('this.accountList: ', this.accountList)

   });
  }
  onUserListChange(event) {
    const value = event.target.value;
    console.log('...onUserListChange= ', value)
    this.getAccountList(value);
  }
  getUsers() {
    this.userService.getUsers().subscribe(data => {
      console.log('...in getUsers data= ', data)
      console.log('...in getUsers usersList= ', data.Data.User)
      this.usersList = data.Data.User;
    });
  }
  loadLookups() {
    this.currencyList = LookupService.currencyList;
    this.creditDebitList = LookupService.CreditDebitList;
    this.balanceTypeList = LookupService.balanceTypeList;
  }

  saveBalance() {
    this.balance.Amount = this.balanceAmount;
    this.balance.userId = this.userId;

    console.log('this.balance: ', this.balance)
    this.balanceService.saveBalance(this.balance).subscribe(data => {
      console.log('POST Request is successful ', data);
      this.showMsg = true;
      this.showSuccessMsg = true;
      this.showErrorMsg = false;
      this.balance = new Balance();
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

}
