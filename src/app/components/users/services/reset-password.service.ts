import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../../app/app-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }
  changePassword(dataToSend){
    return this.http
      .post(`${systemSettings.serverURL}/users/changePassword`,dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );    
  }
}
