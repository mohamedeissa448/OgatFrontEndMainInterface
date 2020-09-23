import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from "../../shared/services/notification.service"
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-shipping-company-contact',
  templateUrl: './shipping-company-contact.component.html',
  styleUrls: ['./shipping-company-contact.component.css']
})
export class ShippingCompanyContactComponent implements OnInit {

  id;
  ShippingCompany_Code;
  ShippingCompany_Name
  title;
  ShippingCompany_Contacts:any=[];
  ShippingCompany_ContactTitle :any = "";
  ShippingCompany_ContactName  :any = "";
  ShippingCompany_ContactTelephone :any = "";
  ShippingCompany_ContactEmail :any = "";
  constructor(
    public contactsService: ContactsService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ShippingCompanyContactComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    // tslint:disable-next-line: whitespace
    this.id=data.id;
    this.ShippingCompany_Code=data.ShippingCompany_Code
    this.ShippingCompany_Name=data.ShippingCompany_Name

    this.contactsService.getShippingCompanyContactsByID(this.id).subscribe((response:any)=>{
      console.log("response",response)
      this.ShippingCompany_Contacts = response.data.shippingCompany.ShippingCompany_Contacts;
    });

  }
  
  ngOnInit() {
}
 
  onAdd(f) {
    console.log("f",f);
    if(!this.ShippingCompany_Contacts){
      this.ShippingCompany_Contacts=[]
    }
    this.ShippingCompany_Contacts.push(f.form.value);
    f.form.reset();
  }

  deleteContact(contact){
     this.ShippingCompany_Contacts.splice( this.ShippingCompany_Contacts.indexOf(contact), 1);
  }

  onSubmit(){
    this.contactsService.addContactsToShippingCompanyByShippingCompanyId({
      ShippingCompany_Contacts :this.ShippingCompany_Contacts,
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
