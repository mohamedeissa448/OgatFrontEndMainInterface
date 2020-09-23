import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { AuthService } from '../../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AffiliateSellerService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient,private authService: AuthService) {
    this.form = new FormGroup({
      AffiliateSeller_Type: new FormControl("",[Validators.required]),
      AffiliateSeller_Name: new FormControl(""),
      AffiliateSeller_DisplayName: new FormControl(""),
      AffiliateSeller_NationalID: new FormControl(""),
      AffiliateSeller_CommercialRegisterID: new FormControl(""),
      AffiliateSeller_TaxID: new FormControl(""),
      AffiliateSeller_Email: new FormControl(""),
      AffiliateSeller_Password: new FormControl(""),
      AffiliateSeller_Phone: new FormControl(""),
      AffiliateSeller_Address: new FormControl(""),
      AffiliateSeller_City: new FormControl(""),
      AffiliateSeller_Country: new FormControl(""),
      AffiliateSeller_WebsiteURL: new FormControl(""),
      AffiliateSeller_FaceBookPageURL: new FormControl([""]),
      AffiliateSeller_Rate: new FormControl(""),
      AffiliateSeller_Class_Code: new FormControl(""),
      AffiliateSeller_RevenuePercentage: new FormControl(""),
      AffiliateSeller_Bank_Name:new FormControl(""),
      AffiliateSeller_BankAccountNumber:new FormControl(""),
      AffiliateSeller_BankAccountHolderName:new FormControl(""),
      AffiliateSeller_BankIBANNumber:new FormControl(""),
      AffiliateSeller_IsActive: new FormControl(""),

    });
  }

  getAffiliateSellers() {
    return this.http.get(`${systemSettings.serverURL}/affiliateSellers/getAll`)
  }
  addAffiliateSeller(affiliateSeller) {
    console.log("added", affiliateSeller);
    return this.http
      .post(`${systemSettings.serverURL}/AffiliateSellers/addAffiliateSeller`, {
        AffiliateSeller_Type: affiliateSeller.AffiliateSeller_Type,
        AffiliateSeller_Name: affiliateSeller.AffiliateSeller_Name,
        AffiliateSeller_DisplayName : affiliateSeller.AffiliateSeller_DisplayName,
        AffiliateSeller_NationalID: affiliateSeller.AffiliateSeller_NationalID,
        AffiliateSeller_CommercialRegisterID: affiliateSeller.AffiliateSeller_CommercialRegisterID,
        AffiliateSeller_TaxID: affiliateSeller.AffiliateSeller_TaxID,
        AffiliateSeller_Email: affiliateSeller.AffiliateSeller_Email,
        AffiliateSeller_Password: affiliateSeller.AffiliateSeller_Password,
        AffiliateSeller_Phone: affiliateSeller.AffiliateSeller_Phone,
        AffiliateSeller_Address: affiliateSeller.AffiliateSeller_Address,
        AffiliateSeller_City: affiliateSeller.AffiliateSeller_City,
        AffiliateSeller_Country: affiliateSeller.AffiliateSeller_Country,
        AffiliateSeller_WebsiteURL: affiliateSeller.AffiliateSeller_WebsiteURL,
        AffiliateSeller_FaceBookPageURL: affiliateSeller.AffiliateSeller_FaceBookPageURL,
        AffiliateSeller_Rate: affiliateSeller.AffiliateSeller_Rate,
        AffiliateSeller_Class_Code: affiliateSeller.AffiliateSeller_Class_Code,
        AffiliateSeller_RevenuePercentage: affiliateSeller.AffiliateSeller_RevenuePercentage,
        AffiliateSeller_Bank_Name:affiliateSeller.AffiliateSeller_Bank_Name,
        AffiliateSeller_BankAccountNumber:affiliateSeller.AffiliateSeller_BankAccountNumber,
      AffiliateSeller_BankAccountHolderName:affiliateSeller.AffiliateSeller_BankAccountHolderName,
      AffiliateSeller_BankIBANNumber:affiliateSeller.AffiliateSeller_BankIBANNumber,
      AffiliateSeller_CreatedByUser: this.authService.currentUser._id
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  updateAffiliateSeller(updatedAffiliateSeller,id) {
    console.log("updated", updatedAffiliateSeller);

   return this.http
      .post(`${systemSettings.serverURL}/AffiliateSellers/editAffiliateSeller`, {
        _id: id,
        AffiliateSeller_Type: updatedAffiliateSeller.AffiliateSeller_Type,
        AffiliateSeller_Name:updatedAffiliateSeller.AffiliateSeller_Name,
        AffiliateSeller_DisplayName:updatedAffiliateSeller.AffiliateSeller_DisplayName,
        AffiliateSeller_NationalID: updatedAffiliateSeller.AffiliateSeller_NationalID,
        AffiliateSeller_CommercialRegisterID: updatedAffiliateSeller.AffiliateSeller_CommercialRegisterID,
        AffiliateSeller_TaxID: updatedAffiliateSeller.AffiliateSeller_TaxID,
        AffiliateSeller_Email: updatedAffiliateSeller.AffiliateSeller_Email,
        AffiliateSeller_Password: updatedAffiliateSeller.AffiliateSeller_Password,
        AffiliateSeller_Phone: updatedAffiliateSeller.AffiliateSeller_Phone,
        AffiliateSeller_Address: updatedAffiliateSeller.AffiliateSeller_Address,
        AffiliateSeller_City: updatedAffiliateSeller.AffiliateSeller_City,
        AffiliateSeller_Country: updatedAffiliateSeller.AffiliateSeller_Country,
        AffiliateSeller_WebsiteURL: updatedAffiliateSeller.AffiliateSeller_WebsiteURL,
        AffiliateSeller_FaceBookPageURL: updatedAffiliateSeller.AffiliateSeller_FaceBookPageURL,
        AffiliateSeller_Rate: updatedAffiliateSeller.AffiliateSeller_Rate,
        AffiliateSeller_Class_Code: updatedAffiliateSeller.AffiliateSeller_Class_Code,
        AffiliateSeller_RevenuePercentage: updatedAffiliateSeller.AffiliateSeller_RevenuePercentage,
        AffiliateSeller_Bank_Name: updatedAffiliateSeller.AffiliateSeller_Bank_Name,
        AffiliateSeller_BankAccountNumber: updatedAffiliateSeller.AffiliateSeller_BankAccountNumber,
      AffiliateSeller_BankAccountHolderName: updatedAffiliateSeller.AffiliateSeller_BankAccountHolderName,
      AffiliateSeller_BankIBANNumber: updatedAffiliateSeller.AffiliateSeller_BankIBANNumber,
        AffiliateSeller_IsActive: updatedAffiliateSeller.AffiliateSeller_IsActive, 
        
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  popualteForm(AffiliateSeller) {
    console.log("AffiliateSeller", AffiliateSeller);
    this.form.setValue({
      AffiliateSeller_Type: AffiliateSeller.AffiliateSeller_Type,
      AffiliateSeller_Name:AffiliateSeller.AffiliateSeller_Name ,
      AffiliateSeller_DisplayName: AffiliateSeller.AffiliateSeller_DisplayName ||"",
      AffiliateSeller_NationalID: AffiliateSeller.AffiliateSeller_NationalID,
      AffiliateSeller_CommercialRegisterID: AffiliateSeller.AffiliateSeller_CommercialRegisterID,
      AffiliateSeller_TaxID: AffiliateSeller.AffiliateSeller_TaxID,
      AffiliateSeller_Email: AffiliateSeller.AffiliateSeller_Email,
      AffiliateSeller_Password: AffiliateSeller.AffiliateSeller_Password,
      AffiliateSeller_Phone: AffiliateSeller.AffiliateSeller_Phone,
      AffiliateSeller_Address: AffiliateSeller.AffiliateSeller_Address,
      AffiliateSeller_City: AffiliateSeller.AffiliateSeller_City,
      AffiliateSeller_Country: AffiliateSeller.AffiliateSeller_Country,
      AffiliateSeller_WebsiteURL: AffiliateSeller.AffiliateSeller_WebsiteURL,
      AffiliateSeller_FaceBookPageURL: AffiliateSeller.AffiliateSeller_FaceBookPageURL,
      AffiliateSeller_Rate: AffiliateSeller.AffiliateSeller_Rate,
      AffiliateSeller_Class_Code: AffiliateSeller.AffiliateSeller_Class_Code,
      AffiliateSeller_RevenuePercentage: AffiliateSeller.AffiliateSeller_RevenuePercentage,
      AffiliateSeller_Bank_Name: AffiliateSeller.AffiliateSeller_Bank_Name,
      AffiliateSeller_BankAccountNumber: AffiliateSeller.AffiliateSeller_BankAccountNumber,
      AffiliateSeller_BankAccountHolderName: AffiliateSeller.AffiliateSeller_BankAccountHolderName,
      AffiliateSeller_BankIBANNumber: AffiliateSeller.AffiliateSeller_BankIBANNumber,
      AffiliateSeller_IsActive: AffiliateSeller.AffiliateSeller_IsActive, 
    });
  }
  ///////////////////////// Helpful routes ///////////////////
 
  getClasses() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/classes/getAllClasses`)
  }
  getCountries() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/countries/getAllCountries`)
  }
  

}
