import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillingAddressService {

  constructor(private http: HttpClient) { }
  getCustomerBillingAddressByID(_id){
    return this.http.post(`${systemSettings.serverURL}/customers/getCustomerBillingAddressByID`,{_id})
  }

  addBillingAddressToCustomerByCustomerId(dataToSend){
    return this.http
    .post(`${systemSettings.serverURL}/customers/addBillingAddressToCustomerByCustomerId`, dataToSend)
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
