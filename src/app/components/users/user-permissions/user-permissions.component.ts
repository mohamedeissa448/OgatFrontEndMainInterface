import { Component, OnInit, Inject } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from "../services/user.service";
import { ToastService } from "../../../services/toast.service"


@Component({
    selector: "app-user-permissions",
    templateUrl: "./user-permissions.component.html",
    styleUrls: ["./user-permissions.component.css"]
  })
  export class UserPermissionsComponent implements OnInit {
    UserData :any ={};
    SystemPermisions = [];
    UserForm: any;
    form: FormGroup;
    ActionType:string;
    saveIsLoading = false;
    isDataChanged = false;
    constructor( private ToastService :ToastService,
        private DataService: UserService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<UserPermissionsComponent>,
        @Inject(MAT_DIALOG_DATA) data){
        this.UserData['UserPermission'] = data.UserPermmisions;
        this.UserData['UserName'] = data.UserName;
        this.UserData['UserCode'] = data.UserCode;
        console.log(data)
    }

    ngOnInit() {
        this.DataService.getSystemPermisions().subscribe((result:[])=>{
            this.createGroupedPermissions(result.reduce(function (r, a:any) {
                r[a.PermissionCategory] = r[a.PermissionCategory] || [];
                r[a.PermissionCategory].PermissionCategory = a.PermissionCategory
                r[a.PermissionCategory].push(a);
                return r;
            }, Object.create(null)));
        });
    }
    createGroupedPermissions(result){
        this.SystemPermisions = result;
        //map User's permission to it's sysPermission
        this.UserData['UserPermission'].forEach(function(Permision, index, EmpuserPermission) {
            for(var PermisionCat in result) {
                var value = result[PermisionCat];
                value.forEach(function(PermisionItem, index3, PermissionSubList) {
                    if(PermisionItem.PermissionName == Permision){
                        PermisionItem.IsEnabled = true;
                    }
                })
             }
        });
        
    }
    
    SavePermissionData() {
        this.saveIsLoading = true;
        var NewPermissionList = [];
        for(var PermisionCat in this.SystemPermisions) {
            var value = this.SystemPermisions[PermisionCat];
            value.forEach(function(PermisionItem) {
                if(PermisionItem.IsEnabled == true){
                    NewPermissionList.push(PermisionItem.PermissionName);// = NewPermissionList + PermisionItem.PermissionName +",";
                }
            })
        };
        this.DataService.setUserPermision({User_Permissions:NewPermissionList,User_Code: this.UserData['UserCode']}).subscribe(result=>{
            if(result['message'] ==true){
                this.ToastService.success("Permissions Updated Successfully");
                this.saveIsLoading = false;
                this.isDataChanged = true;
            }
            else
            {
                this.ToastService.failed(result['message']);
                this.saveIsLoading = false;
                this.isDataChanged = true;
            }
        })
    }
    close() {
        this.dialogRef.close(this.isDataChanged);
    }
  }