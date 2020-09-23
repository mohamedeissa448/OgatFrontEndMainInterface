import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService {

  constructor(private http: HttpClient) { }
  getCustomerShippingAddressByID(_id){
    return this.http.post(`${systemSettings.serverURL}/customers/getCustomerShippingAddressByID`,{_id})
  }

  addShippingAddressToCustomerByCustomerId(dataToSend){
    return this.http
    .post(`${systemSettings.serverURL}/customers/addShippingAddressToCustomerByCustomerId`, dataToSend)
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
  /*********** Helpful routes*/
  getProvinces() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/provinces/getAllProvinces`)
  }
}
