import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../model/account';
import { AccountIdentification } from '../../model/account-identification';
import { Lookup } from '../../model/lookup';
import { Servicer } from '../../model/servicer';
import { AccountServiceService } from '../../service/account-service.service';
import { LookupService } from '../../service/lookup.service';
import { UserService } from '../../service/user-service.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  usersList: any;
  errorMesage: any;

  public accountIdentificationList: AccountIdentification[] =  []  ;
  public accountIdentification: AccountIdentification = new AccountIdentification;
  public accountServicer: Servicer = new Servicer();

  accountTypeList: Lookup[];
  accountSubTypeList: Lookup[];
  currencyList: Lookup[];
  statusList: Lookup[];
  schemeNameList: Lookup[];
  CreditDebitList: Lookup[];
  balanceTypeList: Lookup[];
  addressTypeList: Lookup[];
  AuthorizationTypeList: Lookup[];
  mutabilityList: Lookup[];

  public account: Account = new Account();
  showMsg = false;
  showSuccessMsg = false;
  showErrorMsg = false;

  // public accountIdent: AccountIdentification= new AccountIdentification();
  public cur: string;

  constructor(private router: Router, private lookupService: LookupService , private userService: UserService, private accountService: AccountServiceService) {  }


  ngOnInit(): void {
    this.getUsers();
    this.lookupService.getLookups();
    setTimeout(() => console.log('waiting..') , 1000);
    this.loadLookups();
    this.accountServicer.SchemaName = 'BIC'

  }
  loadLookups() {
    console.log('this.lookupService.accountTypeList: ', LookupService.accountTypeList)
    console.log('accountTypeList: ', this.accountTypeList)

    this.accountTypeList = LookupService.accountTypeList;
    this.accountSubTypeList = LookupService.accountSubTypeList;
    this.currencyList = LookupService.currencyList;
    this.statusList = LookupService.statusList;
    this.schemeNameList = LookupService.schemeNameList;
    this.CreditDebitList = LookupService.CreditDebitList;
    this.balanceTypeList = LookupService.balanceTypeList;
    this.addressTypeList = LookupService.addressTypeList;
    this.AuthorizationTypeList = LookupService.AuthorizationTypeList;
    this.mutabilityList = LookupService.mutabilityList;
  }
  saveAccount() {
    this.account.Servicer = this.accountServicer;
  //  this.accountService.addNewAccount(this.account);
  this.accountService.addAccount(this.account).subscribe(data => {
    console.log('POST Request is successful ', data);
    this.showMsg = true;
    this.showSuccessMsg = true;
    this.showErrorMsg = false;
    this.account = new Account();
    this.accountIdentification = new AccountIdentification();
  },
    error => {
      // this.showMsg=true;
      this.errorMesage = error.message;
      this.showErrorMsg = true;
      this.showSuccessMsg = false;
      console.log('Error...', error);
    }

  );
   console.log('account: ', this.account)
  }
  confirmSuccessMessage() {
    this.router.navigate(['/ob-sandbox/view-users']);

  }
  getUsers() {
    this.userService.getUsers().subscribe(data => {
      console.log('...in getUsers data= ', data)
      console.log('...in getUsers usersList= ', data.Data.User)
      this.usersList = data.Data.User;
    });
  }


    addFieldValue() {
    console.log('accountIdentificationObj', this.accountIdentification)
    this.accountIdentificationList.push(this.accountIdentification)
    this.accountIdentification = new AccountIdentification ();
    this.account.Account = this.accountIdentificationList;
    console.log('this.account.accountIdentifications', this.account.Account)
    }

    deleteFieldValue(index) {
        this.accountIdentificationList.splice(index, 1);
    }
}
