import { Component, OnInit, Inject } from '@angular/core';
import { ResetPasswordService } from '../services/reset-password.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PageTitleService } from "../../../services/page-title.service";

@Component({
  selector: 'app-reset-user-password',
  templateUrl: './reset-user-password.component.html',
  styleUrls: ['./reset-user-password.component.css']
})
export class ResetUserPasswordComponent implements OnInit {
  isMatched=true;
  constructor(private resetPasswordService:ResetPasswordService,private authService:AuthService,
    private notificationService:NotificationService, private PageTitle: PageTitleService,
    public dialogRef: MatDialogRef<ResetUserPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      
     }

  ngOnInit() {
    this.PageTitle.ChangePageTitle('Dashboard','Home');
  }
  onSubmit(formValue){
    if(formValue.confirm_password != formValue.new_password){
      this.isMatched=false
    }else{
      let dataToSend:any = {};
      dataToSend.id =  this.data.User_Code;
      dataToSend.password = formValue.new_password;
      this.resetPasswordService.changePassword(dataToSend).subscribe((status)=>{
        if(status){
          this.notificationService.success("Password updated successfully")
        }else{
          this.notificationService.failed("Password Can not be updated")
        }
        this.dialogRef.close()
      })
    }
  }

}
