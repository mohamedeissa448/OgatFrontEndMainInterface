import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { AuthService } from '../../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReturnOrderService {

  constructor(private http: HttpClient,private authService:AuthService) { }

  searchOrders(dataToSend) {
    return this.http
      .post(`${systemSettings.serverURL}/orders/searchOrders`, dataToSend)
       
  }

  getAffiliateSellerOrderById(id) {
    console.log("id", id);
    return this.http
      .post(`${systemSettings.serverURL}/orders/getAffiliateSellerOrderById`, {_id:id}) 
  }
  returnOneProductFromOrder(dataToSend){
    return this.http
      .post(`${systemSettings.serverURL}/orders/returnOneProductFromOrder`, dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  getReturnReasons() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/return-reasons/getAllReturnReasons`)
  }

}
