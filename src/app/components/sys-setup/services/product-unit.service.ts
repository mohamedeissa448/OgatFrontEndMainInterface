import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';

@Injectable({
  providedIn: 'root'
})
export class ProductUnitService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      ProductUnit_Name: new FormControl("",[Validators.required]),
      ProductUnit_Description: new FormControl(""),
      ProductUnit_IsActive: new FormControl(""),
      
    });
  }

  getProductUnits() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/productUnits/getAllProductUnits`)
  }
  addProductUnit(productUnit) {
    console.log("added", productUnit);
    return this.http
      .post(`${systemSettings.serverURL}/sys-setup/productUnits/addProductUnit`, {
        ProductUnit_Name: productUnit.ProductUnit_Name,
        ProductUnit_Description: productUnit.ProductUnit_Description,
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateProductUnit(updateProductUnit,id) {
    console.log("updated", updateProductUnit);

   return this.http
      .post(`${systemSettings.serverURL}/sys-setup/productUnits/editProductUnitById`, {
        _id: id,
        ProductUnit_Name: updateProductUnit.ProductUnit_Name,
        ProductUnit_Description: updateProductUnit.ProductUnit_Description,
        ProductUnit_IsActive: updateProductUnit.ProductUnit_IsActive,
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(productUnit) {
    console.log("productUnit", productUnit);
    this.form.setValue({
      ProductUnit_Name: productUnit.ProductUnit_Name || "",
      ProductUnit_Description: productUnit.ProductUnit_Description,
      ProductUnit_IsActive: productUnit.ProductUnit_IsActive || "", 
    });
  }
}
