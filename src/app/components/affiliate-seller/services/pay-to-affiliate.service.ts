import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PayToAffiliateService {

  constructor(private http: HttpClient) { }
  getAffiliateSellerPaymentsByID(_id){
    return this.http.post(`${systemSettings.serverURL}/affiliateSellers/getAffiliateSellerPaymentsByID`,{_id})
  }

  addPaymentsToAffiliateSellerByAffiliateSellerId(dataToSend){
    return this.http
    .post(`${systemSettings.serverURL}/affiliateSellers/addPaymentsToAffiliateSellerByAffiliateSellerId`, dataToSend)
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
  /**********Helpful routes */
  getPaymentMethods() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/payments/getAllPayments`)
  }
}
