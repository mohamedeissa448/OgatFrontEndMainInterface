import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      PaymentMethod_Name: new FormControl("",[Validators.required]),
      PaymentMethod_Description: new FormControl(""),
      PaymentMethod_IsActive: new FormControl(""),
      
    });
  }

  getPaymentMethods() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/payments/getAllPayments`)
  }
  addPaymentMethod(paymentMethod) {
    console.log("added", paymentMethod);
    return this.http
      .post(`${systemSettings.serverURL}/sys-setup/payments/addPayment`, {
        PaymentMethod_Name: paymentMethod.PaymentMethod_Name,
        PaymentMethod_Description: paymentMethod.PaymentMethod_Description,
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updatePaymentMethod(updatedPaymentMethod,id) {
    console.log("updated", updatedPaymentMethod);

   return this.http
      .post(`${systemSettings.serverURL}/sys-setup/payments/editPaymentById`, {
        _id: id,
        PaymentMethod_Name: updatedPaymentMethod.PaymentMethod_Name,
        PaymentMethod_Description: updatedPaymentMethod.PaymentMethod_Description,
        PaymentMethod_IsActive: updatedPaymentMethod.PaymentMethod_IsActive,
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(paymentMethod) {
    console.log("paymentMethod", paymentMethod);
    this.form.setValue({
      PaymentMethod_Name: paymentMethod.PaymentMethod_Name || "",
      PaymentMethod_Description: paymentMethod.PaymentMethod_Description,
      PaymentMethod_IsActive: paymentMethod.PaymentMethod_IsActive || "", 
    });
  }
}
