import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../../core/service/auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MainComponent implements OnInit {


  constructor(private authService: AuthService) {

  }

  ngOnInit() {

  }

  logOut() {
    this.authService.logOut();
  }

}
