import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }
  getShippingCompanyContactsByID(_id){
    return this.http.post(`${systemSettings.serverURL}/shippingCompanies/getShippingCompanyContactsByID`,{_id})
  }

  addContactsToShippingCompanyByShippingCompanyId(dataToSend){
    return this.http
    .post(`${systemSettings.serverURL}/shippingCompanies/addContactsToShippingCompanyByShippingCompanyId`, dataToSend)
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
}
