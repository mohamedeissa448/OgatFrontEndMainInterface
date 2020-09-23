import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) {

  }

  
  getSupplierBills() {
    return this.http.get(`${systemSettings.serverURL}/supplierBills/getAll`)
  }
  addSupplierBill(dataToSend) {
    console.log("added", dataToSend);
    return this.http
      .post(`${systemSettings.serverURL}/supplierBills/addSupplierBill`, dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  getOneById(ID){
    return this.http.post(`${systemSettings.serverURL}/supplierBills/getOneById`,{ _id : ID })
  }
  updateSupplierBill(updatedSupplierBill,id) {
    console.log("updated", updatedSupplierBill);

   return this.http
      .post(`${systemSettings.serverURL}/supplierBills/editSupplierBillById`, {
        updatedSupplierBill:updatedSupplierBill,
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
