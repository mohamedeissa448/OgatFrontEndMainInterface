import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      Supplier_Name: new FormControl("",[Validators.required]),
      Supplier_Email: new FormControl("", [Validators.required]),
      Supplier_Phone: new FormControl("",[Validators.required]),
      Supplier_WebsiteURL: new FormControl("",[Validators.required]),
      Supplier_FaceBookPageURL: new FormControl("",[Validators.required]),
      Supplier_Country: new FormControl(""),
      Supplier_City: new FormControl(""),
      Supplier_Address: new FormControl(""),
      Supplier_AddressGPSLocation: new FormControl(""),
      Supplier_StoreAddress: new FormControl(""),
      Supplier_StoreGPSLocation: new FormControl(""),
      Supplier_TimeOfDelivery: new FormControl(""),
      Supplier_Categories: new FormControl([""]),
      Supplier_Class_Code: new FormControl(""),
      Supplier_Rate: new FormControl(""),
      Supplier_PaymentMethods: new FormControl([""]),
      Supplier_WayOfDeliveries:new FormControl([""]),
      Supplier_IsActive: new FormControl(""),

    });
  }

  getSuppliers() {
    return this.http.get(`${systemSettings.serverURL}/suppliers/getAll`)
  }
  addSupplier(supplier) {
    console.log("added", supplier);
    return this.http
      .post(`${systemSettings.serverURL}/suppliers/addSupplier`, {
        Supplier_Name: supplier.Supplier_Name,
        Supplier_Email: supplier.Supplier_Email,
        Supplier_Phone: supplier.Supplier_Phone,
        Supplier_WebsiteURL: supplier.Supplier_WebsiteURL,
        Supplier_FaceBookPageURL: supplier.Supplier_FaceBookPageURL,
        Supplier_Country: supplier.Supplier_Country,
        Supplier_City: supplier.Supplier_City,
        Supplier_Address: supplier.Supplier_Address,
        Supplier_AddressGPSLocation: supplier.Supplier_AddressGPSLocation,
        Supplier_StoreAddress: supplier.Supplier_StoreAddress,
        Supplier_StoreGPSLocation: supplier.Supplier_StoreGPSLocation,
        Supplier_TimeOfDelivery: supplier.Supplier_TimeOfDelivery,
        Supplier_Categories: supplier.Supplier_Categories,
        Supplier_Class_Code: supplier.Supplier_Class_Code,
        Supplier_Rate: supplier.Supplier_Rate,
        Supplier_PaymentMethods: supplier.Supplier_PaymentMethods,
        Supplier_WayOfDeliveries:supplier.Supplier_WayOfDeliveries,
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateSupplier(updatedSupplier,id) {
    console.log("updated", updatedSupplier);

   return this.http
      .post(`${systemSettings.serverURL}/suppliers/editSupplier`, {
        _id: id,
        Supplier_Name: updatedSupplier.Supplier_Name,
        Supplier_Email:updatedSupplier.Supplier_Email ,
        Supplier_Phone: updatedSupplier.Supplier_Phone,
        Supplier_WebsiteURL: updatedSupplier.Supplier_WebsiteURL,
        Supplier_FaceBookPageURL: updatedSupplier.Supplier_FaceBookPageURL,
        Supplier_Country: updatedSupplier.Supplier_Country,
        Supplier_City: updatedSupplier.Supplier_City,
        Supplier_Address: updatedSupplier.Supplier_Address,
        Supplier_AddressGPSLocation: updatedSupplier.Supplier_AddressGPSLocation,
        Supplier_StoreAddress: updatedSupplier.Supplier_StoreAddress,
        Supplier_StoreGPSLocation: updatedSupplier.Supplier_StoreGPSLocation,
        Supplier_TimeOfDelivery: updatedSupplier.Supplier_TimeOfDelivery,
        Supplier_Categories: updatedSupplier.Supplier_Categories,
        Supplier_Class_Code: updatedSupplier.Supplier_Class_Code,
        Supplier_Rate: updatedSupplier.Supplier_Rate,
        Supplier_PaymentMethods: updatedSupplier.Supplier_PaymentMethods,
        Supplier_WayOfDeliveries: updatedSupplier.Supplier_WayOfDeliveries,
        Supplier_IsActive: updatedSupplier.Supplier_IsActive, 
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(supplier) {
    console.log("supplier", supplier);
    this.form.setValue({
      Supplier_Name: supplier.Supplier_Name,
      Supplier_Email:supplier.Supplier_Email ,
      Supplier_Phone: supplier.Supplier_Phone,
      Supplier_WebsiteURL: supplier.Supplier_WebsiteURL,
      Supplier_FaceBookPageURL: supplier.Supplier_FaceBookPageURL,
      Supplier_Country: supplier.Supplier_Country,
      Supplier_City: supplier.Supplier_City,
      Supplier_Address: supplier.Supplier_Address,
      Supplier_AddressGPSLocation: supplier.Supplier_AddressGPSLocation,
      Supplier_StoreAddress: supplier.Supplier_StoreAddress,
      Supplier_StoreGPSLocation: supplier.Supplier_StoreGPSLocation,
      Supplier_TimeOfDelivery: supplier.Supplier_TimeOfDelivery,
      Supplier_Categories: supplier.Supplier_Categories,
      Supplier_Class_Code: supplier.Supplier_Class_Code,
      Supplier_Rate: supplier.Supplier_Rate,
      Supplier_PaymentMethods: supplier.Supplier_PaymentMethods,
      Supplier_WayOfDeliveries: supplier.Supplier_WayOfDeliveries,
      Supplier_IsActive: supplier.Supplier_IsActive, 
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
  getSupplierCategories() {
    return this.http.get(`${systemSettings.serverURL}/categories/getAll`)
  }

}
