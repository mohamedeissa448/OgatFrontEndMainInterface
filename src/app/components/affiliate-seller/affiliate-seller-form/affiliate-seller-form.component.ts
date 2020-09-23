import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// tslint:disable-next-line: quotemark
// tslint:disable-next-line: semicolon
import { NotificationService } from "../../shared/services/notification.service"
import { AffiliateSellerService } from '../services/affiliate-seller.service';

@Component({
  selector: 'app-affiliate-seller-form',
  templateUrl: './affiliate-seller-form.component.html',
  styleUrls: ['./affiliate-seller-form.component.css']
})
export class AffiliateSellerFormComponent implements OnInit {

  id;
  AffiliateSeller_Code;
  title;
  countries :any=[];
  classes:any=[];
  AffiliateSeller_Types=[
    {
      name:"Personal"
    },
    {
      name:"Company"
    }
  ]
  constructor(
    public affiliateSellerService: AffiliateSellerService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<AffiliateSellerFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    // tslint:disable-next-line: whitespace
    this.id=data.id;
    this.AffiliateSeller_Code=data.Supplier_Code
  }

  ngOnInit() {
    this.affiliateSellerService.getCountries().subscribe((countries)=>{
      this.countries=countries
    })
    
  this.affiliateSellerService.getClasses().subscribe((classes)=>{
    this.classes=classes
  });
  
}
  onClear() {
    this.affiliateSellerService.form.reset();
  }

  onSubmit() {
    if (this.affiliateSellerService.form.valid) {
      //on adding supplier
      if (this.title === "Add New Affiliate Seller") {
        this.affiliateSellerService.addAffiliateSeller(
          this.affiliateSellerService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit An Affiliate Seller") {
        //update supplier
        this.affiliateSellerService.updateAffiliateSeller(this.affiliateSellerService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.affiliateSellerService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.affiliateSellerService.form.reset();
    this.dialogRef.close();
  }


}
