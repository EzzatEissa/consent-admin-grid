import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Consent} from "../../model/consent";
import {UserService} from "../../service/user.service";
import {UserSearch} from "../../model/user-search";
import {User} from "../../model/user";
import {SegmentService} from "../../service/segment.service";
import {Segment} from "../../model/segment";
import {AccountService} from "../../service/account.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  model = {} as UserSearch;
  users: User [];
  dtUser: User;
  segments: Segment [];
  consentDisplay: boolean = false;
  tpDisplay: boolean = false;

  accounts: Account [];
  dtAccount: Account;
  accountDisplay= false;

  selectedConsent = {} as Consent;

  constructor(private userService: UserService,
              private segmentService: SegmentService,
              private accountService: AccountService) {

  }

  ngOnInit() {
    this.segmentService.getAllSegments().subscribe(res => {
      this.segments = res;
    });



  }

  onSubmit(){
    this.users = [];
    if(this.model.userName
      || this.model.firstName
      || this.model.lastName
      || this.model.segment
      || this.model.accountNumber) {
      this.userService.getUsers(this.model).subscribe(res => {
        this.users = res;
      });
    }
  }

  viewAccounts(userId: number){

    this.accountService.getAllUsersAccounts(userId).subscribe(res => {
      this.accounts = res;
      this.accountDisplay = true;
    });
  }


}
