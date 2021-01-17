import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponentComponent} from './components/user-component/user-component.component';
import {AccountComponent} from './components/account/account.component';
import {NewAccountComponent} from './components/new-account/new-account.component';
import {NewTransactionComponent} from './components/new-transaction/new-transaction.component';
import {TransactionsListComponent} from './components/transactions-list/transactions-list.component';
import {BalanceListComponent} from './components/balance-list/balance-list.component';
import {NewBalanceComponent} from './components/new-balance/new-balance.component';
import {LookupConfigComponent} from './components/lookup-config/lookup-config.component';


const routes: Routes = [
  { path: 'view-users', component: UserComponentComponent },
  { path: 'view-accounts', component: AccountComponent },
  { path: 'edit-accounts', component: AccountComponent },
  { path: 'add-accounts', component: NewAccountComponent },
  { path: 'add-transactions', component: NewTransactionComponent },
  { path: 'transctions-list', component: TransactionsListComponent },
  { path: 'balances-list', component: BalanceListComponent },
  { path: 'add-balances', component: NewBalanceComponent },
  { path: 'lookup-config', component: LookupConfigComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObSandboxRoutingModule { }
