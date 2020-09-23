import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';

@Injectable({
  providedIn: 'root'
})
export class ProductMaterialService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      ProductMaterial_Name: new FormControl("",[Validators.required]),
      ProductMaterial_Description: new FormControl(""),
      ProductMaterial_IsActive: new FormControl(""),
      
    });
  }

  getProductMaterials() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/productMaterials/getAllProductMaterials`)
  }
  addProductMaterial(productMaterial) {
    console.log("added", productMaterial);
    return this.http
      .post(`${systemSettings.serverURL}/sys-setup/productMaterials/addProductMaterial`, {
        ProductMaterial_Name: productMaterial.ProductMaterial_Name,
        ProductMaterial_Description: productMaterial.ProductMaterial_Description,
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateProductMaterial(updateProductMaterial,id) {
    console.log("updated", updateProductMaterial);

   return this.http
      .post(`${systemSettings.serverURL}/sys-setup/productMaterials/editProductMaterialById`, {
        _id: id,
        ProductMaterial_Name: updateProductMaterial.ProductMaterial_Name,
        ProductMaterial_Description: updateProductMaterial.ProductMaterial_Description,
        ProductMaterial_IsActive: updateProductMaterial.ProductMaterial_IsActive,
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(productMaterial) {
    console.log("productMaterial", productMaterial);
    this.form.setValue({
      ProductMaterial_Name: productMaterial.ProductMaterial_Name || "",
      ProductMaterial_Description: productMaterial.ProductMaterial_Description,
      ProductMaterial_IsActive: productMaterial.ProductMaterial_IsActive || "", 
    });
  }
}
