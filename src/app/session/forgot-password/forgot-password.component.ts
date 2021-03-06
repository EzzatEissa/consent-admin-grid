import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router} from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import {AuthService} from "../../core/service/auth/auth.service";

@Component({
   selector: 'ms-forgot-password',
   templateUrl:'./forgot-password-component.html',
   styleUrls: ['./forgot-password-component.scss'],
   encapsulation: ViewEncapsulation.None,
})

export class ForgotPasswordComponent {

   email : string;

   constructor(private router: Router,
               private authService : AuthService,
               public translate: TranslateService) { }

   /**
     * forgetPassword is used to send a reset password link into your mail.
     */
   forgetPassword(value){
      if(value.email !=undefined) {
         this.authService.resetPassword(value);
      }
   }
}


