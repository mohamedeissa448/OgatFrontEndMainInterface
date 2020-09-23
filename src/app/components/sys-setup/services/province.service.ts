import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      Province_Name: new FormControl("",[Validators.required]),
      Province_ShortCode: new FormControl(""),
      Province_IsActive: new FormControl(""),
      
    });
  }

  getProvinces() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/provinces/getAllProvinces`)
  }
  addProvince(province) {
    console.log("added", province);
    return this.http
      .post(`${systemSettings.serverURL}/sys-setup/provinces/addProvince`, {
        Province_Name: province.Province_Name,
        Province_ShortCode: province.Province_ShortCode,
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateProvince(updateProvince,id) {
    console.log("updated", updateProvince);

   return this.http
      .post(`${systemSettings.serverURL}/sys-setup/provinces/editProvinceById`, {
        _id: id,
        Province_Name: updateProvince.Province_Name,
        Province_ShortCode: updateProvince.Province_ShortCode,
        Province_IsActive: updateProvince.Province_IsActive,
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(province) {
    console.log("province", province);
    this.form.setValue({
      Province_Name: province.Province_Name || "",
      Province_ShortCode: province.Province_ShortCode,
      Province_IsActive: province.Province_IsActive || "", 
    });
  }
}
