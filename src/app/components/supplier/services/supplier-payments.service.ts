import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierPaymentsService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      SupplierPayment_Date: new FormControl("",[Validators.required]),
      SupplierPayment_DoneBy_User: new FormControl("", [Validators.required]),
      SupplierPayment_PaymentMethod: new FormControl("",[Validators.required]),
      SupplierPayment_Amount: new FormControl("",[Validators.required]),
    });
  }

  getSuppliers() {
    return this.http.get(`${systemSettings.serverURL}/suppliers/getAll`)
  }

  getSuppliersPayments() {
    return this.http.get(`${systemSettings.serverURL}/suppliersPayments/getAll`)
  }
  getPaymentByID(_id) {
    return this.http.post(`${systemSettings.serverURL}/suppliersPayments/getOneById`,{_id})
  }
  addSupplierPayment(dataToSend) {
    console.log("added", dataToSend);
    return this.http
      .post(`${systemSettings.serverURL}/suppliersPayments/addSupplierPayment`, dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateSupplierPayment(updatedSupplier,id) {
    console.log("updated", updatedSupplier);

   return this.http
      .post(`${systemSettings.serverURL}/suppliersPayments/editSupplierPayment`, {
        _id: id,
        SupplierPayment_Date: updatedSupplier.SupplierPayment_Date,
        SupplierPayment_DoneBy_User:updatedSupplier.SupplierPayment_DoneBy_User ,
        SupplierPayment_PaymentMethod: updatedSupplier.SupplierPayment_PaymentMethod,
        SupplierPayment_Amount: updatedSupplier.SupplierPayment_Amount, 
        SupplierPayment_Supplier : updatedSupplier.SupplierPayment_Supplier
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
      SupplierPayment_Date: supplier.SupplierPayment_Date,
      SupplierPayment_DoneBy_User:supplier.SupplierPayment_DoneBy_User ,
      SupplierPayment_PaymentMethod: supplier.SupplierPayment_PaymentMethod,
      SupplierPayment_Amount: supplier.SupplierPayment_Amount,
      
    });
  }
  ///////////////////////// Helpful routes ///////////////////
  
  getPaymentMethods() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/payments/getAllPayments`)
  }
}
