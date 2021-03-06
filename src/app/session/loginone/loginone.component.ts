import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { Router} from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import {AuthService} from "../../core/service/auth/auth.service";


@Component({
   selector: 'ms-loginone-session',
   templateUrl:'./loginone-component.html',
   styleUrls: ['./loginone-component.scss'],
   encapsulation: ViewEncapsulation.None,
})

export class LoginoneComponent {

   email    : string ="admin";
   password : string = "admin";
   name     :string;

   constructor( private router: Router,
                private authService : AuthService,
                public translate: TranslateService) { }

   // when email and password is correct, user logged in.
   logIn(value){
      this.authService.loginUser({email: 'demo@example.com', password: '0123456789'});
   }

}



