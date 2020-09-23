import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from "../../shared/services/notification.service"
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-shipping-company-contract',
  templateUrl: './shipping-company-contract.component.html',
  styleUrls: ['./shipping-company-contract.component.css']
})
export class ShippingCompanyContractComponent implements OnInit {

  id;
  ShippingCompany_Code;
  ShippingCompany_Name
  title;
  ShippingCompany_Contract:any= {};
  ContractDate :any= {};
  ContractPriceAndCost :any= {};
  provinces:any = [];
  constructor(
    public ContractService: ContractService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ShippingCompanyContractComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    // tslint:disable-next-line: whitespace
    this.id=data.id;
    this.ShippingCompany_Code=data.ShippingCompany_Code
    this.ShippingCompany_Name=data.ShippingCompany_Name
  }
  
  ngOnInit() {
    this.ContractService.getProvinces().subscribe((provinces)=>{
      this.provinces = provinces;
    })
    this.ContractService.getShippingCompanyContractsByID(this.id).subscribe((response:any)=>{
      console.log("response",response)
      if(response.data.shippingCompany.ShippingCompany_Contract){
        this.ShippingCompany_Contract = response.data.shippingCompany.ShippingCompany_Contract;
        this.ContractDate= this.ShippingCompany_Contract.ContractDate;
        this.ContractPriceAndCost = this.ShippingCompany_Contract.ContractPriceAndCost
      }
     
    });
  }
 

  onSubmit(){
    this.ShippingCompany_Contract= {
      ContractDate : this.ContractDate,
      ContractPriceAndCost: this.ContractPriceAndCost
    };
    this.ContractService.addContractsToShippingCompanyByShippingCompanyId({
      ShippingCompany_Contract :this.ShippingCompany_Contract,
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
