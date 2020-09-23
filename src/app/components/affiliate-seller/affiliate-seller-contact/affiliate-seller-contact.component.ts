import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from "../../shared/services/notification.service"
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-affiliate-seller-contact',
  templateUrl: './affiliate-seller-contact.component.html',
  styleUrls: ['./affiliate-seller-contact.component.css']
})
export class AffiliateSellerContactComponent implements OnInit {

  id;
  AffiliateSeller_Code;
  AffiliateSeller_Name
  title;
  AffiliateSeller_Contacts:any=[]
  AffiliateSeller_ContactTitle :any = "";
  AffiliateSeller_ContactName  :any = "";
  AffiliateSeller_ContactTelephone :any = "";
  AffiliateSeller_ContactEmail :any = "";
  constructor(
    public contactsService: ContactsService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<AffiliateSellerContactComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    // tslint:disable-next-line: whitespace
    this.id=data.id;
    this.AffiliateSeller_Code=data.AffiliateSeller_Code
    this.AffiliateSeller_Name=data.AffiliateSeller_Name

    this.contactsService.getAffiliateSellerContactsByID(this.id).subscribe((response:any)=>{
      console.log("response",response)
      this.AffiliateSeller_Contacts = response.data.seller.AffiliateSeller_Contacts;
    });

  }
  
  ngOnInit() {
}
 
  onAdd(f) {
    console.log("f",f);
    if(!this.AffiliateSeller_Contacts){
      this.AffiliateSeller_Contacts=[]
    }
    this.AffiliateSeller_Contacts.push(f.form.value);
    f.form.reset();
  }

  deleteContact(contact){
     this.AffiliateSeller_Contacts.splice( this.AffiliateSeller_Contacts.indexOf(contact), 1);
  }

  onSubmit(){
    this.contactsService.addContactsToAffiliateSellerByAffiliateSellerId({
      AffiliateSeller_Contacts :this.AffiliateSeller_Contacts,
      _id:this.id
    }).subscribe((status) => {
      if(status==true)
      this.notificationService.success(":: Updated Successfully");
      else
      this.notificationService.failed(":: Something went wrong,Please try again later!");
    });
    
  }
  onClose() {
    this.dialogRef.close();
  }



}
