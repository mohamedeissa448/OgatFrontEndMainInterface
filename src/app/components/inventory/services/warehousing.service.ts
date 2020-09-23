import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WarehousingService {

  constructor(private http: HttpClient) { }

  getUnHousedProducts() {
    return this.http.get(`${systemSettings.serverURL}/store/getUnHousedProducts`)
  }
  getHousedProducts(){
    return this.http.get(`${systemSettings.serverURL}/store/getHousedProducts`)
  }
  createBarcode(Product){
    let ProductCode,ProductIdentifier, SizeIdentifier, ColorIdentifier = "";
    ProductCode = Product.Store_Product.Product_Code
    ProductIdentifier = Product.Store_Product.Product_Identifier;
    SizeIdentifier = Product.Size_Variant.Size_TwoLettersIdentifier;
    ColorIdentifier = Product.Color_Variant.Color_ThreeLettersIdentifier;
    return ProductIdentifier + SizeIdentifier + ColorIdentifier + ProductCode;
  }
  barcodeToCheck(Product){
    let ProductCode,ProductIdentifier, SizeIdentifier, ColorIdentifier = "";
    ProductCode = Product.Product.Product_Code
    ProductIdentifier = Product.Product.Product_Identifier;
    SizeIdentifier = Product.Size_Variant.Size_TwoLettersIdentifier;
    ColorIdentifier = Product.Color_Variant.Color_ThreeLettersIdentifier;
    return ProductIdentifier + SizeIdentifier + ColorIdentifier + ProductCode;
  }
  housingProduct(dataToSend){
    return this.http
    .post(`${systemSettings.serverURL}/store/housingProduct`, dataToSend)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
