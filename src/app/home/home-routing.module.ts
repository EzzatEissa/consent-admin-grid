import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./component/main/main.component";
import {AppComponent} from "./component/app/app.component";
import {ConsentComponent} from "./component/consent/consent.component";
import {UserComponent} from "./component/user/user.component";
import {PermissionComponent} from "./component/permission/permission.component";


const routes: Routes = [
  {path: '', redirectTo: 'home'},
  {path: 'home', component: MainComponent},
  {path: 'user', component: UserComponent},
  {path: 'user-consent', component: ConsentComponent},
  {path: 'app', component: AppComponent},
  {path: 'permission', component: PermissionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
