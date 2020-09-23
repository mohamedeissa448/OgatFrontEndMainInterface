import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShippingCompanyService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      ShippingCompany_Name: new FormControl("",[Validators.required]),
      ShippingCompany_Email: new FormControl("", [Validators.required]),
      ShippingCompany_Phone: new FormControl("",[Validators.required]),
      ShippingCompany_WebsiteURL: new FormControl("",[Validators.required]),
      ShippingCompany_FaceBookPageURL: new FormControl("",[Validators.required]),
      ShippingCompany_Country: new FormControl(""),
      ShippingCompany_City: new FormControl(""),
      ShippingCompany_Address: new FormControl(""),
      ShippingCompany_Class_Code: new FormControl(""),
      ShippingCompany_Rate: new FormControl(""),
      ShippingCompany_IsActive: new FormControl(""),

    });
  }

  getShippingCompanies() {
    return this.http.get(`${systemSettings.serverURL}/shippingCompanies/getAll`)
  }
  addShippingCompany(ShippingCompany) {
    console.log("added", ShippingCompany);
    return this.http
      .post(`${systemSettings.serverURL}/shippingCompanies/addShippingCompany`, {
        ShippingCompany_Name: ShippingCompany.ShippingCompany_Name,
        ShippingCompany_Email: ShippingCompany.ShippingCompany_Email,
        ShippingCompany_Phone: ShippingCompany.ShippingCompany_Phone,
        ShippingCompany_WebsiteURL: ShippingCompany.ShippingCompany_WebsiteURL,
        ShippingCompany_FaceBookPageURL: ShippingCompany.ShippingCompany_FaceBookPageURL,
        ShippingCompany_Country: ShippingCompany.ShippingCompany_Country,
        ShippingCompany_City: ShippingCompany.ShippingCompany_City,
        ShippingCompany_Address: ShippingCompany.ShippingCompany_Address,
        ShippingCompany_Class_Code: ShippingCompany.ShippingCompany_Class_Code,
        ShippingCompany_Rate: ShippingCompany.ShippingCompany_Rate,
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateShippingCompany(updatedShippingCompany,id) {
    console.log("updated", updatedShippingCompany);

   return this.http
      .post(`${systemSettings.serverURL}/shippingCompanies/editShippingCompany`, {
        _id: id,
        ShippingCompany_Name: updatedShippingCompany.ShippingCompany_Name,
        ShippingCompany_Email:updatedShippingCompany.ShippingCompany_Email ,
        ShippingCompany_Phone: updatedShippingCompany.ShippingCompany_Phone,
        ShippingCompany_WebsiteURL: updatedShippingCompany.ShippingCompany_WebsiteURL,
        ShippingCompany_FaceBookPageURL: updatedShippingCompany.ShippingCompany_FaceBookPageURL,
        ShippingCompany_Country: updatedShippingCompany.ShippingCompany_Country,
        ShippingCompany_City: updatedShippingCompany.ShippingCompany_City,
        ShippingCompany_Address: updatedShippingCompany.ShippingCompany_Address,
        ShippingCompany_Class_Code: updatedShippingCompany.ShippingCompany_Class_Code,
        ShippingCompany_Rate: updatedShippingCompany.ShippingCompany_Rate,
        ShippingCompany_IsActive: updatedShippingCompany.ShippingCompany_IsActive, 
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(ShippingCompany) {
    console.log("ShippingCompany", ShippingCompany);
    this.form.setValue({
      ShippingCompany_Name: ShippingCompany.ShippingCompany_Name,
      ShippingCompany_Email:ShippingCompany.ShippingCompany_Email ,
      ShippingCompany_Phone: ShippingCompany.ShippingCompany_Phone,
      ShippingCompany_WebsiteURL: ShippingCompany.ShippingCompany_WebsiteURL,
      ShippingCompany_FaceBookPageURL: ShippingCompany.ShippingCompany_FaceBookPageURL,
      ShippingCompany_Country: ShippingCompany.ShippingCompany_Country,
      ShippingCompany_City: ShippingCompany.ShippingCompany_City,
      ShippingCompany_Address: ShippingCompany.ShippingCompany_Address,
      ShippingCompany_Class_Code: ShippingCompany.ShippingCompany_Class_Code,
      ShippingCompany_Rate: ShippingCompany.ShippingCompany_Rate,
      ShippingCompany_IsActive: ShippingCompany.ShippingCompany_IsActive, 
    });
  }
  ///////////////////////// Helpful routes ///////////////////
  getCategories() {
    return this.http.get(`${systemSettings.serverURL}/categories/getAll`)
  }
  getClasses() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/classes/getAllClasses`)
  }
  getCountries() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/countries/getAllCountries`)
  }
  getPaymentMethods() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/payments/getAllPayments`)
  }
  getWaysOfDelivery() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/deliveries/getAllDeliveries`)
  }
  getShippingCompanyCategories() {
    return this.http.get(`${systemSettings.serverURL}/categories/getAll`)
  }
}
