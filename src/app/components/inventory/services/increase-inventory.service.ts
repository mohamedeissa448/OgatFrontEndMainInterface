import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncreaseInventoryService {

  
  constructor(private http: HttpClient) {

  }

  getIncreaseInventories() {
    return this.http.get(`${systemSettings.serverURL}/increaseInventory/getAll`)
  }
  addIncreaseInventory(dataToSend) {
    console.log("added", dataToSend);
    return this.http
      .post(`${systemSettings.serverURL}/increaseInventory/addIncreaseInventory`, dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  getOneById(ID){
    return this.http.post(`${systemSettings.serverURL}/increaseInventory/getOneById`,{ _id : ID })
  }
  updateIncreaseInventory(updatedIncreaseInventory,id) {
    console.log("updated", updatedIncreaseInventory);

   return this.http
      .post(`${systemSettings.serverURL}/increaseInventory/editIncreaseInventoryById`, {
        updatedIncreaseInventory:updatedIncreaseInventory,
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
