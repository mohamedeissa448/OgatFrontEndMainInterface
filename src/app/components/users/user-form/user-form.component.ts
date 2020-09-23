import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../services/user.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  id;
  title;
  constructor(
    public userService: UserService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  onClear() {
    this.userService.form.reset();
  }

  onSubmit() {
    if (this.userService.form.valid) {
      //on adding size
      if (this.title === "Add New User") {
        this.userService.addUser(
          this.userService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } /*else if (this.title === "Edit Product Unit") {
        //update size
        this.userService.updateProductUnit(this.userService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }*/
      this.userService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.userService.form.reset();
    this.dialogRef.close();
  }


}
