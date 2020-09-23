import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StoreReportService {

  constructor(private http: HttpClient) {}
  getStorProductMatrix() {
    return this.http.get(`${systemSettings.serverURL}/store/getStorProductMatrix`)
  }
}
