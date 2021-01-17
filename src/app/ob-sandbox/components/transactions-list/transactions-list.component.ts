import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Transaction} from '../../model/transaction';
import {AccountServiceService} from '../../service/account-service.service';
import {TransactionService} from '../../service/transaction.service';
import {LookupService} from '../../service/lookup.service';
import {Account} from '../../model/account';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {
  static accountObj: Account;

  title = 'Accounts page';
  accounts: Account[];
  newAccount: number;
  account: Account;
  transactionsList: Transaction[];


  constructor(private router: Router, private accountService: AccountServiceService
    , private lookupService: LookupService, private transactionService: TransactionService
    ) {
  }
  ngOnInit(): void {
    console.log('...in ngOnInit TransactionsListComponent ')
    this.account = AccountServiceService.accountObj;
    console.log('aaa this.account, ', this.account)

      // this.getAccounts(this.account.userId);
      this.getTransactionsList(this.account.AccountId) ;
      this.lookupService.getLookups();

  }
  getAccounts(userId) {
    this.accountService.getAccountsWithUserId(userId).subscribe(data => {
      console.log('...in getAccounts data= ', data)

      this.accounts = data.Data.Account;
    });
  }
  getTransactionsList(accoountId) {
    this.transactionService.getTransactionsWithAccountId(accoountId).subscribe(data => {
      console.log('...in getTransactionsList data= ', data)

      this.transactionsList = data.Data.Transaction;
      console.log('...in getTransactionsList this.transactionsList= ', this.transactionsList)

    });
  }

  addTransaction(): void {
    TransactionService.accountId = this.account.AccountId;
    TransactionService.userId = this.account.userId;
    TransactionService.account = this.account;
    this.router.navigate(['/ob-sandbox/add-transactions'])
      .then((e) => {
        if (e) {
          console.log('Navigation is successful!');
        } else {
          console.log('Navigation has failed!');
        }
      });


    // this.newAccount=1
  }
  DeleteTransaction(tranId, index) {
    if (confirm('Are you sure to delete Transaction ' + tranId)) {

      this.transactionService.deleteTransaction(tranId).subscribe(data => {
        console.log('Delete User Request is successful ', data);
        this.transactionsList.splice(index, 1);
      },
        error => {
          console.log('Error...', error);
        }
      );
    }
  }


}
