import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './component/main/main.component';
import {FormsModule} from "@angular/forms";


import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../shared/shared.module";
import { AppComponent } from './component/app/app.component';
import {ConsentComponent} from "./component/consent/consent.component";
import { UserComponent } from './component/user/user.component';
import { PermissionComponent } from './component/permission/permission.component';


@NgModule({
  declarations: [MainComponent, ConsentComponent, AppComponent, UserComponent, PermissionComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    TranslateModule,
    SharedModule
  ]
})
export class HomeModule { }
