import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeAffiliatePercentageService {

  constructor(private http: HttpClient,private authService:AuthService) { }
  getAffiliateSellerLastPercentageByID(_id){
    return this.http.post(`${systemSettings.serverURL}/AffiliateSellers/getOneById`,{_id})
  }

  addAffiliateSeller_RevenuePercentageChangesLogById(dataToSend){
    dataToSend.affiliateSeller_Percentage_Info.ChangedByUser = this.authService.currentUser._id
    return this.http
    .post(`${systemSettings.serverURL}/AffiliateSellers/addAffiliateSeller_RevenuePercentageChangesLogById`, dataToSend)
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
  
}
