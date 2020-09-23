import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DecreaseInventoryService {

  constructor(private http: HttpClient) {

  }

  getDecreaseInventories() {
    return this.http.get(`${systemSettings.serverURL}/decreaseInventory/getAll`)
  }
  addDecreaseInventory(dataToSend) {
    console.log("added", dataToSend);
    return this.http
      .post(`${systemSettings.serverURL}/decreaseInventory/addDecreaseInventory`, dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  getOneById(ID){
    return this.http.post(`${systemSettings.serverURL}/decreaseInventory/getOneById`,{ _id : ID })
  }
  updateDecreaseInventory(updatedDecreaseInventory,id) {
    console.log("updated", updatedDecreaseInventory);

   return this.http
      .post(`${systemSettings.serverURL}/decreaseInventory/editDecreaseInventoryById`, {
        updatedDecreaseInventory:updatedDecreaseInventory,
        _id: id
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
 

  /**********************Helpful Routes */
  getProducts() {
    return this.http.get(`${systemSettings.serverURL}/products/getAll`)
  }
  getSizes() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/sizes/getAllSizes`)
  }
  
  getColorVariants(){
    return this.http.get(`${systemSettings.serverURL}/sys-setup/colors/getAllProductColors`)
  }
}
