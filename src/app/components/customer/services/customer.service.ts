import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      Customer_Name: new FormControl("",[Validators.required]),

        AddressName : new FormControl(""),
        ContactName : new FormControl(""),
        Mobile      : new FormControl(""),
        Building    : new FormControl(""),
        Floor       : new FormControl(""),
        Apartment   : new FormControl(""),
        StreetAddress: new FormControl(""),
        City        : new FormControl(""),
        Province    : new FormControl(""),
  
      Customer_Status: new FormControl(""),

    });
  }

  getCustomers() {
    return this.http.get(`${systemSettings.serverURL}/customers/getAll`)
  }
  addCustomer(customer) {
    console.log("added", customer);
    return this.http
      .post(`${systemSettings.serverURL}/customers/addCustomer`, {
        Customer_Name: customer.Customer_Name,
        Address: customer.Address,
        Customer_Status: customer.Customer_Status
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateCustomer(updatedCustomer,id) {
    console.log("updated", updatedCustomer);

   return this.http
      .post(`${systemSettings.serverURL}/customers/editCustomer`, {
        _id: id,
        Customer_Name: updatedCustomer.Customer_Name,
        Address: updatedCustomer.Address,
        Customer_Status: updatedCustomer.Customer_Status
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(customer) {
    console.log("customer", customer);
    this.form.setValue({
      Customer_Name: customer.Customer_Name,

        AddressName : customer.Address.AddressName,
        ContactName : customer.Address.ContactName,
        Mobile      : customer.Address.Mobile,
        Building    : customer.Address.Building,
        Floor       : customer.Address.Floor,
        Apartment   : customer.Address.Apartment,
        StreetAddress: customer.Address.StreetAddress,
        City        : customer.Address.City,
        Province    : customer.Address.Province,
  
      Customer_Status: customer.Customer_Status, 
    });
  }
  ///////////////////////// Helpful routes ///////////////////
  getProvinces() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/provinces/getAllProvinces`)
  }
}
