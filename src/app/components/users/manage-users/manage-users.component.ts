import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { UserService } from '../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { ResetUserPasswordComponent } from '../reset-user-password/reset-user-password.component';
import { UserPermissionsComponent } from '../user-permissions/user-permissions.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Code",
    "User Name",
    "Display Name",
    "Active",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.userService.getAllUsers().subscribe((users: []) => {
      this.isLoading = false;
      this.users = new MatTableDataSource(users);
      this.users.sort = this.sort;
      this.users.paginator = this.paginator;
    });
  }
  onAdd() {
    this.userService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New User" };
    let dialogRef=this.dialog.open(UserFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    this.userService.popualteForm(element)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit User",id:element._id };

    let dialogRef=this.dialog.open(UserFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  resetPassword(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = element;

    let dialogRef=this.dialog.open(ResetUserPasswordComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((isDataChanged)=>{
      if(isDataChanged)
        this.initialize()
    })
  }

  changePermissions(userToEdit){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90%";
    dialogConfig.data = { 
      UserName: userToEdit.User_Name,
      UserCode: userToEdit.User_Code,
      UserPermmisions: userToEdit.User_Permissions
    };
    let dialogRef=this.dialog.open(UserPermissionsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    if (this.searchKey)
      this.users.filter = this.searchKey.trim().toLowerCase();
  }



}
