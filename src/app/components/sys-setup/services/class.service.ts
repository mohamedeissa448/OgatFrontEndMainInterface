import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
@Injectable({
  providedIn: 'root'
})
export class ClassService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      Class_Name: new FormControl("",[Validators.required]),
      Class_Description: new FormControl(""),
      Class_IsActive: new FormControl(""),
      
    });
  }

  getClasses() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/classes/getAllClasses`)
  }
  addClass(newClass) {
    console.log("added", newClass);
    return this.http
      .post(`${systemSettings.serverURL}/sys-setup/classes/addClass`, {
        Class_Name: newClass.Class_Name,
        Class_Description: newClass.Class_Description,
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateClass(updateClass,id) {
    console.log("updated", updateClass);

   return this.http
      .post(`${systemSettings.serverURL}/sys-setup/classes/editClassById`, {
        _id: id,
        Class_Name: updateClass.Class_Name,
        Class_Description: updateClass.Class_Description,
        Class_IsActive: updateClass.Class_IsActive,
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(ourClass) {
    console.log("ourClass", ourClass);
    this.form.setValue({
      Class_Name: ourClass.Class_Name || "",
      Class_Description: ourClass.Class_Description,
      Class_IsActive: ourClass.Class_IsActive || "", 
    });
  }
}
