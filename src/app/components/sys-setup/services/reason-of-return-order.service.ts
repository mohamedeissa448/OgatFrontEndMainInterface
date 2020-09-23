import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';

@Injectable({
  providedIn: 'root'
})
export class ReasonOfReturnOrderService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      ReasonOfReturn_Name: new FormControl("",[Validators.required]),
      ReasonOfReturn_Description: new FormControl(""),
      ReasonOfReturn_IsActive: new FormControl(""),
      
    });
  }

  getReasons() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/return-reasons/getAllReturnReasons`)
  }
  addReason(newReason) {
    console.log("added", newReason);
    return this.http
      .post(`${systemSettings.serverURL}/sys-setup/return-reasons/addReturnReason`, {
        ReasonOfReturn_Name: newReason.ReasonOfReturn_Name,
        ReasonOfReturn_Description: newReason.ReasonOfReturn_Description,
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
      .post(`${systemSettings.serverURL}/sys-setup/return-reasons/editReturnReasonById`, {
        _id: id,
        ReasonOfReturn_Name: updatedReason.ReasonOfReturn_Name,
        ReasonOfReturn_Description: updatedReason.ReasonOfReturn_Description,
        ReasonOfReturn_IsActive: updatedReason.ReasonOfReturn_IsActive,
        
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
      ReasonOfReturn_Name: ourReason.ReasonOfReturn_Name || "",
      ReasonOfReturn_Description: ourReason.ReasonOfReturn_Description,
      ReasonOfReturn_IsActive: ourReason.ReasonOfReturn_IsActive || "", 
    });
  }
}
