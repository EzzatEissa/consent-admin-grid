import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Transaction} from '../../model/transaction';
import {CurrencyExchange} from '../../model/currencyExchange';
import {BankTransactionCode} from '../../model/bankTransactionCode';
import {MerchantDetails} from '../../model/merchantDetails';
import {Amount} from '../../model/amount';
import {Balance} from '../../model/balance';
import {Lookup} from '../../model/lookup';
import {LookupService} from '../../service/lookup.service';
import {AccountServiceService} from '../../service/account-service.service';
import {TransactionService} from '../../service/transaction.service';
import {UserService} from '../../service/user-service.service';
import {Account} from '../../model/account';


@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {
  transactionsList: any;
  transaction: Transaction = new Transaction();
  currencyExchange: CurrencyExchange = new CurrencyExchange();
  bancTranCode: BankTransactionCode = new BankTransactionCode();
  merchantDetails: MerchantDetails = new MerchantDetails();
  amount: Amount = new Amount();
  chargeAmount: Amount = new Amount();
  balance: Balance = new Balance();
  balanceAmount: Amount = new Amount();

  usersList: any;
  errorMesage: any;
  accountList: any;
  accountTypeList: Lookup[];
  accountSubTypeList: Lookup[];
  currencyList: Lookup[];
  statusList: Lookup[];
  schemeNameList: Lookup[];


  creditDebitList: Lookup[];
  balanceTypeList: Lookup[];
  addressTypeList: Lookup[];
  AuthorizationTypeList: Lookup[];
  mutabilityList: Lookup[];

  public account: Account = new Account();
  showMsg = false;
  showSuccessMsg = false;
  showErrorMsg = false;
  accountServiceObj: Account;

  constructor(private router: Router, private lookupService: LookupService
    , private userService: UserService, private accountService: AccountServiceService
    , private transactionService: TransactionService) {  }

  ngOnInit(): void {
    this.getUsers();
    console.log('TransactionService.account: ', TransactionService.account)

    if (TransactionService.account != null || !TransactionService.account == undefined) {
      this.accountServiceObj = TransactionService.account;
      this.transaction.AccountId = this.accountServiceObj.AccountId;
      this.transaction.userId = this.accountServiceObj.userId;
      this.getAccountList(this.transaction.userId)
    }
    console.log('this.transaction: ', this.transaction)

    this.lookupService.getLookups();
    setTimeout(() => console.log('waiting..') , 1000);
    this.loadLookups();
    const today = new Date();
    this.currencyExchange.QuotationDate = today.toISOString().split('T')[0]

  }

  getAccountList(userId) {
     this.accountService.getAccountsWithUserId(userId).subscribe(data => {
      this.accountList = data.Data.Account;
      console.log('this.accountList: ', this.accountList)

    });


  }
  loadLookups() {
    console.log('this.lookupService.accountTypeList: ', LookupService.accountTypeList)
    console.log('accountTypeList: ', this.accountTypeList)

    this.accountTypeList = LookupService.accountTypeList;
    this.accountSubTypeList = LookupService.accountSubTypeList;
    this.currencyList = LookupService.currencyList;
    this.statusList = LookupService.statusList;
    this.schemeNameList = LookupService.schemeNameList;
    this.creditDebitList = LookupService.CreditDebitList;
    this.balanceTypeList = LookupService.balanceTypeList;
    this.addressTypeList = LookupService.addressTypeList;
    this.AuthorizationTypeList = LookupService.AuthorizationTypeList;
    this.mutabilityList = LookupService.mutabilityList;
  }

  getAccountsList(userId) {
    this.transactionService.getTransactionsWithAccountId(userId).subscribe(data => {
      console.log('...in getAccountsList data= ', data)
      console.log('...in getAccountsList transactionsList= ', data.Data.Transaction)
      this.transactionsList = data.Data.User;
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

  saveTransaction() {
    this.transaction.CurrencyExchange = this.currencyExchange;
    this.transaction.MerchantDetails = this.merchantDetails;
    this.transaction.BankTransactionCode = this.bancTranCode;
    this.transaction.Amount = this.amount;
    this.transaction.ChargeAmount = this.chargeAmount;
    this.balance.Amount = this.balanceAmount;
    this.transaction.Balance = this.balance;

    console.log('this.transaction: ', this.transaction)
    this.transactionService.saveTransaction(this.transaction).subscribe(data => {
      console.log('POST Request is successful ', data);
      this.showMsg = true;
      this.showSuccessMsg = true;
      this.showErrorMsg = false;
      this.account = new Account();
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
