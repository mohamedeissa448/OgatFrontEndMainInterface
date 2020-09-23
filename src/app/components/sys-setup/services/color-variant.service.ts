import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { core } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ColorVariantService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      Color_Name: new FormControl("", [Validators.required]),
      Color_ThreeLettersIdentifier: new FormControl("", [Validators.required]),
      Color_Description: new FormControl(""),
      Color_HexaDecimalBasedValue: new FormControl(false),
      Color_IsActive:new FormControl(""),
    });
  }

  getColors() {
   // const headers = new HttpHeaders({
   //   Authorization: `bearer ${localStorage.getItem("token")}`
    //});
    return this.http.get(
      `${systemSettings.serverURL}/sys-setup/colors/getAllProductColors`,
      //{ headers: headers }
    );
  }
  addColor( color,Color_HexaDecimalBasedValue): Observable<boolean> {
    const endPoint1 = `${systemSettings.serverURL}/sys-setup/colors/addColor`;
    //const headers = new HttpHeaders({
    //  Authorization: `bearer ${localStorage.getItem("token")}`
    //});
    console.log("color to add ",color)
    console.log("Color_HexaDecimalBasedValue to add ",Color_HexaDecimalBasedValue)

    return this.http.post(endPoint1, {
      Color_Name:color.Color_Name,
      Color_ThreeLettersIdentifier: color.Color_ThreeLettersIdentifier,
      Color_Description:color.Color_Description,
      Color_HexaDecimalBasedValue:Color_HexaDecimalBasedValue
    }).pipe(
      map((response: any) => {
        if (response.message == true) return true;
        else return false;
      })
    );
  }
  updateColor( color,id,Color_HexaDecimalBasedValue) {
    console.log("color ro update ",color)
    console.log("color id ro update ",id)
    const endPoint1 = `${systemSettings.serverURL}/sys-setup/colors/editColorById`;
    return this.http.post(endPoint1, {
      Color_Name:                  color.Color_Name,
      Color_ThreeLettersIdentifier: color.Color_ThreeLettersIdentifier,
      Color_Description:           color.Color_Description,
      Color_HexaDecimalBasedValue:Color_HexaDecimalBasedValue,
      Color_IsActive:              color.Color_IsActive,
      _id:                         id
    }).pipe(
      map((response: any) => {
        console.log("response",response)
        if (response.message == true) return true;
        else return false;
      })
    );
  }
  popualteForm(color) {
    console.log("color", color);
    this.form.setValue({
      Color_Name: color.Color_Name || "",
      Color_ThreeLettersIdentifier: color.Color_ThreeLettersIdentifier || "",
      Color_Description: color.Color_Description || "",
      Color_HexaDecimalBasedValue: color.Color_HexaDecimalBasedValue || "",
      Color_IsActive: color.Color_IsActive || "",
    });
  }
}
