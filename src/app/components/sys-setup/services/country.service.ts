import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      Country_Name: new FormControl("",[Validators.required]),
      Country_ShortCode: new FormControl(""),
      Country_IsActive: new FormControl(""),
      
    });
  }

  getCountries() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/countries/getAllCountries`)
  }
  addCountry(country) {
    console.log("added", country);
    return this.http
      .post(`${systemSettings.serverURL}/sys-setup/countries/addCountry`, {
        Country_Name: country.Country_Name,
        Country_ShortCode: country.Country_ShortCode,
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateCountry(updateCountry,id) {
    console.log("updated", updateCountry);

   return this.http
      .post(`${systemSettings.serverURL}/sys-setup/countries/editCountryById`, {
        _id: id,
        Country_Name: updateCountry.Country_Name,
        Country_ShortCode: updateCountry.Country_ShortCode,
        Country_IsActive: updateCountry.Country_IsActive,
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(country) {
    console.log("country", country);
    this.form.setValue({
      Country_Name: country.Country_Name || "",
      Country_ShortCode: country.Country_ShortCode,
      Country_IsActive: country.Country_IsActive || "", 
    });
  }
}
