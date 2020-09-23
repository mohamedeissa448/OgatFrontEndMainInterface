import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }
  getShippingCompanyContractsByID(_id){
    return this.http.post(`${systemSettings.serverURL}/shippingCompanies/getShippingCompanyContractsByID`,{_id})
  }

  addContractsToShippingCompanyByShippingCompanyId(dataToSend){
    return this.http
    .post(`${systemSettings.serverURL}/shippingCompanies/addContractsToShippingCompanyByShippingCompanyId`, dataToSend)
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
