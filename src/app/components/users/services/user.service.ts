import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      User_Code: new FormControl(""),
      User_Name: new FormControl("",[Validators.required]),
      User_DisplayName: new FormControl("",[Validators.required]),
      User_Password: new FormControl("",[Validators.required]),
      User_IsActive: new FormControl(""),
      
    });
  }
  getAllUsers() {
    return this.http.get(`${systemSettings.serverURL}/users/getAllUsers`)
  }
  addUser(newUser) {
    console.log("added", newUser);
    return this.http
      .post(`${systemSettings.serverURL}/users/addUser`, {
        User_Name: newUser.User_Name,
        User_DisplayName: newUser.User_DisplayName,
        User_Password: newUser.User_Password,
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
        User_Code: updateClass.User_Code,
        User_Name: updateClass.User_Name,
        User_DisplayName: updateClass.User_DisplayName,
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(ourUser) {
    console.log("ourClass", ourUser);
    this.form.setValue({
      User_Code: ourUser.User_Code || "",
      User_Name: ourUser.User_Name,
      User_DisplayName: ourUser.User_DisplayName || "", 
      User_Password: ourUser.User_Password || "", 
      User_IsActive: ourUser.User_IsActive || "", 
    });
  }
  getSystemPermisions(){
    return this.http.get(`${systemSettings.serverURL}/users/getSystemPermisions`)
  }
  setUserPermision(UserData){
    return this.http.post(`${systemSettings.serverURL}/users/editUserPermissions`, UserData)
  }
}
