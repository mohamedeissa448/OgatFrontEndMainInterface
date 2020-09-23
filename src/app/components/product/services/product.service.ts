import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      Product_Name: new FormControl("",[Validators.required]),
      Product_Identifier: new FormControl("",[Validators.required]),
      Product_Categories:new FormControl("",[Validators.required]),
      Product_Material: new FormControl("", [Validators.required]),
      Product_Size_Variants: new FormControl(""),
      Product_Color_Variants: new FormControl(""),
      Product_DefaultImages_Media: new FormControl(""),
      Product_MainUnit: new FormControl(""),
      Product_MiddleUnit: new FormControl(""),
      Product_MiddleUnitCountInMainUnit: new FormControl(""),
      Product_SmallUnit: new FormControl(""),
      Product_SmallUnitCountInMiddleUnit: new FormControl(""),
      Product_SellingPrice: new FormControl(""),
      Product_MinStocklimit: new FormControl(""),
      Product_IsActive: new FormControl(""),
    
    });
  }

  getProducts() {
    return this.http.get(`${systemSettings.serverURL}/products/getAll`)
  }
  addProduct(product,defaultMedia,colorVariantsImages) {
    console.log("product", product);
    console.log("defaultMedia", defaultMedia);
    console.log("colorVariantsImages", colorVariantsImages);

    return this.http
      .post(`${systemSettings.serverURL}/products/addProduct`, {
        Product_Name:product.Product_Name,
        Product_Identifier:product.Product_Identifier,
        Product_Categories:product.Product_Categories,
        Product_Material: product.Product_Material,
        Product_Size_Variants: product.Product_Size_Variants,
        Product_MainUnit: product. Product_MainUnit,
        Product_MiddleUnit: product.Product_MiddleUnit,
        Product_MiddleUnitCountInMainUnit: product.Product_MiddleUnitCountInMainUnit,
        Product_SmallUnit: product.Product_SmallUnit,
        Product_SmallUnitCountInMiddleUnit: product.Product_SmallUnitCountInMiddleUnit,
        Product_SellingPrice: product.Product_SellingPrice,
        Product_MinStocklimit: product.Product_MinStocklimit,
        ///
        Product_Color_Variants:colorVariantsImages,
        Product_DefaultImages_Media: defaultMedia,


    
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateProduct(updateProduct,id) {
    console.log("updated", updateProduct);

   return this.http
      .post(`${systemSettings.serverURL}/products/editProduct`, {
        _id: id,
        ProductUnit_Name: updateProduct.ProductUnit_Name,
        ProductUnit_Description: updateProduct.ProductUnit_Description,
        ProductUnit_IsActive: updateProduct.ProductUnit_IsActive,
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(product) {
    console.log("product", product);
    let newColors=[]
    product.Product_Color_Variants.forEach((element)=>{
    newColors.push(element.Color_Variants)
    })
    this.form.setValue({
      Product_Name: product.Product_Name,
      Product_Identifier: product.Product_Identifier,
      Product_Categories:product.Product_Categories,
      Product_Material: product.Product_Material,
      Product_Size_Variants: product.Product_Size_Variants,
      Product_Color_Variants: newColors,
      Product_DefaultImages_Media: product.Product_DefaultImages_Media,
      Product_MainUnit: product.Product_MainUnit,
      Product_MiddleUnit: product.Product_MiddleUnit,
      Product_MiddleUnitCountInMainUnit: product.Product_MiddleUnitCountInMainUnit,
      Product_SmallUnit: product.Product_SmallUnit,
      Product_SmallUnitCountInMiddleUnit: product.Product_SmallUnitCountInMiddleUnit,
      Product_SellingPrice: product.Product_SellingPrice,
      Product_MinStocklimit: product.Product_MinStocklimit,
      Product_IsActive: product.Product_IsActive,
    });
  }
  ///////////////////////// Helpful routes ///////////////////
  getCategories() {
    return this.http.get(`${systemSettings.serverURL}/categories/getAll`)
  }
  getProductMaterials() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/productMaterials/getAllProductMaterials`)
  }
  getSizes() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/sizes/getAllSizes`)
  }
  getMedias() {
     return this.http.get(
       `${systemSettings.serverURL}/media/getAll`,
     );
   }
   getProductUnits() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/productUnits/getAllProductUnits`)
  }
  getColorVariants(){
    return this.http.get(`${systemSettings.serverURL}/sys-setup/colors/getAllProductColors`)
  }
}
