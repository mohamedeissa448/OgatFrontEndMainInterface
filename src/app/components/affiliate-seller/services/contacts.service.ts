import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }
  getAffiliateSellerContactsByID(_id){
    return this.http.post(`${systemSettings.serverURL}/affiliateSellers/getAffiliateSellerContactsByID`,{_id})
  }

  addContactsToAffiliateSellerByAffiliateSellerId(dataToSend){
    return this.http
    .post(`${systemSettings.serverURL}/affiliateSellers/addContactsToAffiliateSellerByAffiliateSellerId`, dataToSend)
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
}
