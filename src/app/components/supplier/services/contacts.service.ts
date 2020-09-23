import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }
  getSupplierContactsByID(_id){
    return this.http.post(`${systemSettings.serverURL}/suppliers/getSupplierContactsByID`,{_id})
  }

  addContactsToSupplierBySupplierId(dataToSend){
    return this.http
    .post(`${systemSettings.serverURL}/suppliers/addContactsToSupplierBySupplierId`, dataToSend)
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
}
