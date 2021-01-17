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
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  static accountObj: any;
  static editFlag: boolean;

  usersList: any;
  errorMesage: any;
  public editFlag: boolean;

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

  constructor(private router: Router,
              private lookupService: LookupService ,
              private userService: UserService,
              private accountService: AccountServiceService) {  }


  ngOnInit(): void {
    this.getUsers();
    this.account = AccountComponent.accountObj;
    this.editFlag = AccountComponent.editFlag;
    console.log('...AccountComponent.accountObj ', AccountComponent.accountObj)
    console.log('...this.account ', this.account)
    this.accountIdentificationList = AccountComponent.accountObj.Account;
    if (AccountComponent.accountObj.Servicer != null && AccountComponent.accountObj.Servicer != undefined) {
      this.accountServicer = AccountComponent.accountObj.Servicer;
    }
    // this.accountServicer.Identification=this.account.servicer.Identification;
    // this.lookupService.getLookups();
    this.loadLookups();




  }
  loadLookups() {
    console.log('LookupService.accountTypeList: ', LookupService.accountTypeList)
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
  doUpdate() {
    this.account.Servicer = this.accountServicer;
    //  this.accountService.addNewAccount(this.account);
    this.accountService.updateAccount(this.account).subscribe(data => {
      console.log('Update Request is successful ', data);
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
}
