import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WaysOfDeliveryService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      WayOfDeliverySchema_Name: new FormControl("",[Validators.required]),
      WayOfDeliverySchema_Description: new FormControl(""),
      WayOfDeliverySchema_IsActive: new FormControl(""),
      
    });
  }

  getWaysOfDelivery() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/deliveries/getAllDeliveries`)
  }
  addWayOfDelivery(delivery) {
    console.log("added", delivery);
    return this.http
      .post(`${systemSettings.serverURL}/sys-setup/deliveries/addDelivery`, {
        WayOfDeliverySchema_Name: delivery.WayOfDeliverySchema_Name,
        WayOfDeliverySchema_Description: delivery.WayOfDeliverySchema_Description,
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateWayOfDelivery(updatedDelivery,id) {
    console.log("updated", updatedDelivery);

   return this.http
      .post(`${systemSettings.serverURL}/sys-setup/deliveries/editDeliveryById`, {
        _id: id,
        WayOfDeliverySchema_Name: updatedDelivery.WayOfDeliverySchema_Name,
        WayOfDeliverySchema_Description: updatedDelivery.WayOfDeliverySchema_Description,
        WayOfDeliverySchema_IsActive: updatedDelivery.WayOfDeliverySchema_IsActive,
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(wayOfDelivery) {
    console.log("wayOfDelivery", wayOfDelivery);
    this.form.setValue({
      WayOfDeliverySchema_Name: wayOfDelivery.WayOfDeliverySchema_Name || "",
      WayOfDeliverySchema_Description: wayOfDelivery.WayOfDeliverySchema_Description,
      WayOfDeliverySchema_IsActive: wayOfDelivery.WayOfDeliverySchema_IsActive || "", 
    });
  }
}
