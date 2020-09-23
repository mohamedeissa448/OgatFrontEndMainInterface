import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';

@Injectable({
  providedIn: 'root'
})
export class ReasonOfCancelOrderService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      ReasonOfCalcelation_Name: new FormControl("",[Validators.required]),
      ReasonOfCalcelation_Description: new FormControl(""),
      ReasonOfCalcelation_IsActive: new FormControl(""),
      
    });
  }

  getReasons() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/cancel-reasons/getAllCancelReasons`)
  }
  addReason(newReason) {
    console.log("added", newReason);
    return this.http
      .post(`${systemSettings.serverURL}/sys-setup/cancel-reasons/addCancelReason`, {
        ReasonOfCalcelation_Name: newReason.ReasonOfCalcelation_Name,
        ReasonOfCalcelation_Description: newReason.ReasonOfCalcelation_Description,
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateReason(updatedReason,id) {
    console.log("updated", updatedReason);

   return this.http
      .post(`${systemSettings.serverURL}/sys-setup/cancel-reasons/editCancelReasonById`, {
        _id: id,
        ReasonOfCalcelation_Name: updatedReason.ReasonOfCalcelation_Name,
        ReasonOfCalcelation_Description: updatedReason.ReasonOfCalcelation_Description,
        ReasonOfCalcelation_IsActive: updatedReason.ReasonOfCalcelation_IsActive,
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(ourReason) {
    console.log("ourReason", ourReason);
    this.form.setValue({
      ReasonOfCalcelation_Name: ourReason.ReasonOfCalcelation_Name || "",
      ReasonOfCalcelation_Description: ourReason.ReasonOfCalcelation_Description,
      ReasonOfCalcelation_IsActive: ourReason.ReasonOfCalcelation_IsActive || "", 
    });
  }
}
