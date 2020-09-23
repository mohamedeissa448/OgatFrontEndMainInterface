import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from "../../shared/services/notification.service"
import { ChangeAffiliatePercentageService } from '../services/change-affiliate-percentage.service';

@Component({
  selector: 'app-change-affiliate-percentage',
  templateUrl: './change-affiliate-percentage.component.html',
  styleUrls: ['./change-affiliate-percentage.component.css']
})
export class ChangeAffiliatePercentageComponent implements OnInit {

  id;
  AffiliateSeller_Code;
  AffiliateSeller_Name
  title;
  affiliateSeller_Percentage_Info:any= {};
  ContractDate :any= {};
  provinces:any = [];
  constructor(
    public ChangePercentageService: ChangeAffiliatePercentageService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ChangeAffiliatePercentageComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    // tslint:disable-next-line: whitespace
    this.id=data.id;
    this.AffiliateSeller_Code=data.AffiliateSeller_Code
    this.AffiliateSeller_Name=data.AffiliateSeller_Name
  }
  
  ngOnInit() {
 
    this.ChangePercentageService.getAffiliateSellerLastPercentageByID(this.id).subscribe((response:any)=>{
      console.log("response",response)
      const length = response.AffiliateSeller_RevenuePercentageChangesLog.length;
      if(length > 0){
        this.affiliateSeller_Percentage_Info = response.AffiliateSeller_RevenuePercentageChangesLog[ length-1 ];
      }else{//there is nothing stored in AffiliateSeller_RevenuePercentageChangesLog
        this.affiliateSeller_Percentage_Info.dateOfChanges = response.AffiliateSeller_CreationSysDate ;
        this.affiliateSeller_Percentage_Info.Percentage    = response.AffiliateSeller_RevenuePercentage ;
      }
     
    });
  }
 

  onSubmit(){
    
    this.ChangePercentageService.addAffiliateSeller_RevenuePercentageChangesLogById({
      affiliateSeller_Percentage_Info :this.affiliateSeller_Percentage_Info,
      _id:this.id
    }).subscribe((status) => {
      if(status==true)
      this.notificationService.success(":: Updated Successfully");
      else
      this.notificationService.failed(":: Something went wrong,Please try again later!");
    });
    this.onClose();
  }
  onClose() {
    this.dialogRef.close();
  }


}
