import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ObSandboxRoutingModule} from './ob-sandbox-routing.module';
import {UserComponentComponent} from './components/user-component/user-component.component';
import {TransactionsListComponent} from './components/transactions-list/transactions-list.component';
import {NewTransactionComponent} from './components/new-transaction/new-transaction.component';
import {NewBalanceComponent} from './components/new-balance/new-balance.component';
import {NewAccountComponent} from './components/new-account/new-account.component';
import {BalanceListComponent} from './components/balance-list/balance-list.component';
import {AccountComponent} from './components/account/account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    UserComponentComponent,
    TransactionsListComponent,
    NewTransactionComponent,
    NewBalanceComponent,
    NewAccountComponent,
    BalanceListComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    ObSandboxRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    TranslateModule
  ]
  // ,
  // providers: [ConfigurationUtil, ApiUrl],
})
export class ObSandboxModule {
}
