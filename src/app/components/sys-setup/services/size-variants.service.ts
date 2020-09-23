import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SizeVariantsService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      Size_Name: new FormControl("",[Validators.required]),
      Size_TwoLettersIdentifier: new FormControl("",[Validators.required]),
      Size_Description: new FormControl(""),
      Size_IsActive: new FormControl(""),
      
    });
  }

  getSizes() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/sizes/getAllSizes`)
  }
  addSize(size) {
    console.log("added", size);
    return this.http
      .post(`${systemSettings.serverURL}/sys-setup/sizes/addSize`, {
        Size_Name: size.Size_Name,
        Size_TwoLettersIdentifier: size.Size_TwoLettersIdentifier,
        Size_Description: size.Size_Description,
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateSize(updateSize,id) {
    console.log("updated", updateSize);

   return this.http
      .post(`${systemSettings.serverURL}/sys-setup/sizes/editSizeById`, {
        _id: id,
        Size_Name: updateSize.Size_Name,
        Size_TwoLettersIdentifier: updateSize.Size_TwoLettersIdentifier,
        Size_Description: updateSize.Size_Description,
        Size_IsActive: updateSize.Size_IsActive,
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(size) {
    console.log("size", size);
    this.form.setValue({
      Size_Name: size.Size_Name || "",
      Size_TwoLettersIdentifier : size.Size_TwoLettersIdentifier || "",
      Size_Description: size.Size_Description,
      Size_IsActive: size.Size_IsActive || "", 
    });
  }
}
