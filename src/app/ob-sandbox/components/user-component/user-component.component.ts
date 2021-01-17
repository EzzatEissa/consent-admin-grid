import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TransactionsListComponent} from '../transactions-list/transactions-list.component';
import {AccountComponent} from '../account/account.component';
import {BalanceListComponent} from '../balance-list/balance-list.component';
import {User} from '../../model/user';
import {UserService} from '../../service/user-service.service';
import {AccountServiceService} from '../../service/account-service.service';
import {LookupService} from '../../service/lookup.service';
import {BalancesService} from '../../service/balances.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  title = 'Users page';
  users: User[];
  showAccountsFlag: boolean;
  accounts: Account[];
  newAccount: number;
  showAddUserFlag: boolean;
  newUser: User = new User();
  userId: any;

  constructor(private router: Router, private userService: UserService, private accountService: AccountServiceService
    , private lookupService: LookupService) {
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      console.log('...in getUsers data= ', data)
      console.log('...in getUsers data= ', data.Data)
      console.log('...in getUsers data= ', data.Data.User)
      this.users = data.Data.User;
    });
  }

  showAddUser(): void {
    this.showAddUserFlag = true;
    this.showAccountsFlag = false;
  }
  hideAddUser(): void {
    this.showAddUserFlag = false;
  }
  addUser(): void {
    this.showAddUserFlag = false;
    console.log('...in addUser this.newUser= ', this.newUser)
    this.userService.addNewUser(this.newUser).subscribe(
      data => {
        console.log('POST Request is successful ', data);
        this.getUsers();
        this.newUser = new User();
      },
      error => {
        console.log('Error...', error);
      }
    );

  }



  showAccounts(userId) {
    console.log('...in showAccounts userId= ', userId)
    this.showAccountsFlag = true;
    this.getAccounts(userId)

  }
  getAccounts(userId) {
    this.userId = userId;
    this.accountService.getAccountsWithUserId(userId).subscribe(data => {
      console.log('...in getAccounts data= ', data)

      this.accounts = data.Data.Account;
      console.log('...in getAccounts this.accounts= ', this.accounts)

    });
  }

  DeleteUser(userId, index) {
    if (confirm('Are you sure to delete user ' + userId)) {

      this.userService.deleteUser(userId).subscribe(data => {
        console.log('Delete User Request is successful ', data);
        this.users.splice(index, 1);
      },
        error => {
          console.log('Error...', error);
        }
      );
    }
  }

  DeleteAccount(accountId, index) {
    if (confirm('Are you sure to delete account ' + accountId)) {
      this.accountService.deleteAccount(accountId).subscribe(data => {
        console.log('Delete AccountId Request is successful ', data);
        this.accounts.splice(index, 1);
      },
        error => {
          // this.showMsg=true;
          console.log('Error...', error);
        }
      );
    }
  }

  showTransactionsList(account) {
    account.userId = this.userId
    AccountServiceService.accountObj = account;
    TransactionsListComponent.accountObj = account;
    this.router.navigate(['/ob-sandbox/transctions-list']);
  }
  showAccountDetails(account) {
    account.userId = this.userId
    AccountServiceService.accountObj = account;
    AccountComponent.accountObj = account;
    AccountComponent.editFlag = false;
    this.lookupService.getLookups();
    setTimeout(() => this.router.navigate(['/ob-sandbox/view-accounts']) , 1000);
    ;
  }
  EditAccount(account) {
    account.userId = this.userId
    AccountServiceService.accountObj = account;
    AccountComponent.accountObj = account;
    AccountComponent.editFlag = true;
    this.lookupService.getLookups();
    setTimeout(() => this.router.navigate(['/ob-sandbox/edit-accounts']) , 1000);
    ;
  }
  showBalancesList(account) {
    account.userId = this.userId
    BalancesService.accountObj = account;
    BalanceListComponent.accountObj = account;
    this.lookupService.getLookups();
    setTimeout(() => this.router.navigate(['/ob-sandbox/balances-list']) , 1000);

  }

  ngOnInit(): void {
    console.log('...in ngOnInit UserComponentComponent ')

    // this.router.events.subscribe(value => {
      this.getUsers();
    // });
  }

}
