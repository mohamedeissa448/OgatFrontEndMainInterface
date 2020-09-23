import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from "../../shared/services/notification.service"
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-supplier-contact',
  templateUrl: './supplier-contact.component.html',
  styleUrls: ['./supplier-contact.component.css']
})
export class SupplierContactComponent implements OnInit {

  id;
  Supplier_Code;
  Supplier_Name
  title;
  Supplier_Contacts:any=[]
  Supplier_ContactTitle :any ="";
  Supplier_ContactName  :any ="";
  Supplier_ContactTelephone :any ="";
  Supplier_ContactEmail :any ="";
  constructor(
    public contactsService: ContactsService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<SupplierContactComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    // tslint:disable-next-line: whitespace
    this.id=data.id;
    this.Supplier_Code=data.Supplier_Code
    this.Supplier_Name=data.Supplier_Name

    this.contactsService.getSupplierContactsByID(this.id).subscribe((response:any)=>{
      console.log("response",response)
      this.Supplier_Contacts = response.data.supplier.Supplier_Contacts;
    });

  }
  
  ngOnInit() {
}
 
  onAdd(f) {
    console.log("f",f);
    if(!this.Supplier_Contacts){
      this.Supplier_Contacts=[]
    }
    this.Supplier_Contacts.push(f.form.value);
    f.form.reset();
  }

  deleteContact(contact){
     this.Supplier_Contacts.splice( this.Supplier_Contacts.indexOf(contact), 1);
  }

  onSubmit(){
    this.contactsService.addContactsToSupplierBySupplierId({
      Supplier_Contacts :this.Supplier_Contacts,
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
