import { Component, OnInit } from '@angular/core';
import {Permission} from "../../model/permission";
import {PermissionService} from "../../service/permission.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  model: any = {};
  permissions: Permission [];
  dtPermission: Permission;
  constructor(private permissionService: PermissionService,
              private toastService: ToastrService) { }

  ngOnInit() {

    this.loadAllPermissions();
  }

  onSubmit() {

    this.permissionService.savePermission(this.model).subscribe(res => {
      this.toastService.success('Permission is save succesfully', 'Permission save');
      this.loadAllPermissions();
    }, async (error) => {
      let errMsg = await error.error.toString();
      let errorMessageJson = JSON.parse(errMsg);
      this.toastService.error(errorMessageJson.message,'Error in save');
    });
  }


  loadAllPermissions() {
    this.permissionService.getAllPermissions().subscribe(res => {
      this.permissions = res;
    })
  }

}
