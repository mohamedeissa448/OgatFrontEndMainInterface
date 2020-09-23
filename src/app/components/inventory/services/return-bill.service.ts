import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReturnBillService {

  constructor(private http: HttpClient) {

  }

  
  getSupplierReturnBills() {
    return this.http.get(`${systemSettings.serverURL}/supplierReturnBills/getAll`)
  }
  addSupplierReturnBill(dataToSend) {
    console.log("added", dataToSend);
    return this.http
      .post(`${systemSettings.serverURL}/supplierReturnBills/addSupplierReturnBill`, dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  getOneById(ID){
    return this.http.post(`${systemSettings.serverURL}/supplierReturnBills/getOneById`,{ _id : ID })
  }
  updateSupplierReturnBill(updatedSupplierReturnedBill,id) {
    console.log("updated", updatedSupplierReturnedBill);

   return this.http
      .post(`${systemSettings.serverURL}/supplierReturnBills/editSupplierReturnBillById`, {
        updatedSupplierReturnedBill:updatedSupplierReturnedBill,
        _id: id
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
 

  /**********************Helpful Routes */
  getProducts() {
    return this.http.get(`${systemSettings.serverURL}/products/getAll`)
  }
  getSuppliers() {
    return this.http.get(`${systemSettings.serverURL}/suppliers/getAll`)
  }
  getSizes() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/sizes/getAllSizes`)
  }
  
  getColorVariants(){
    return this.http.get(`${systemSettings.serverURL}/sys-setup/colors/getAllProductColors`)
  }
  getPaymentMethods() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/payments/getAllPayments`)
  }
}
