import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Consent} from "../../model/consent";
import {ConsentService} from "../../service/consent.service";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConsentComponent implements OnInit {

  model: any = {};
  consents: Consent [];
  consent: Consent;
  consentDisplay: boolean = false;
  appDisplay: boolean = false;
  tpDisplay: boolean = false;
  selectedConsent = {} as Consent;

  selectedUserId: number;
  selectedUserName: string;
  currenUser: User;

  constructor(private consentService: ConsentService,
              private userService: UserService,
              private route: ActivatedRoute) {

  }


  ngOnInit() {
    this.selectedUserId = +this.route.snapshot.queryParams['userId'];
    this.selectedUserName = this.route.snapshot.queryParams['userName'];

    if(this.selectedUserId > 0) {
      this.consentService.getConsentByUserId(this.selectedUserId).subscribe(res =>{
        this.consents = res;
      })
    }

    if(this.selectedUserName) {
      this.userService.getUserByName(this.selectedUserName).subscribe( res=> {
        this.currenUser = res;
        console.log(res);
      })
    }
  }

  onSubmit(){

  }

  viewConsent(consent: Consent){
    this.selectedConsent = consent;
    this.consentDisplay = true;
  }

  viewApp(consent){
    this.selectedConsent = consent;
    this.appDisplay = true;
  }

}
