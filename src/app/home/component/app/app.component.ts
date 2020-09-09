import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ConsentService} from "../../service/consent.service";
import {ActivatedRoute} from "@angular/router";
import {App} from "../../model/app";
import {AppService} from "../../service/app.service";

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  selectedUserId: number;
  apps: App[];
  currentApps: App[];
  dtApp: App;
  appPerDisplay: boolean = false;
  selectedApp: App;
  first: number = 0;
  model = {} as App;
  showSearch: boolean = true;
  constructor(private consentService: ConsentService,
              private appService: AppService,
              private route: ActivatedRoute) {

  }


  ngOnInit() {
    this.selectedUserId = +this.route.snapshot.queryParams['userId'];

    if(this.selectedUserId > 0) {
      this.showSearch = false;
      this.consentService.getConsentAppsByUserId(this.selectedUserId).subscribe(res =>{
        this.apps = res;
      })
    } else {
      // this.appService.getAllApps().subscribe(res =>{
      //   this.apps = res;
      // })
    }
  }

  viewAppPermissions(app: App) {
    this.selectedApp = app;
    this.appPerDisplay = true;
  }

  onPageChange($event) {
    this.first = $event.first;

    console.log($event);
  }

  onSubmit() {
    this.appService.getAllApps().subscribe(res =>{
      this.apps = res;
    })
  }
}
