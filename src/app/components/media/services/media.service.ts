import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { systemSettings } from "../../../app-config"
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      Media_Type: new FormControl("", [Validators.required]),
      Media_Title: new FormControl("", [Validators.required]),
      Media_MetaTags: new FormControl(false),
      Media_AlternativeText:new FormControl(""),
      Media_Describtion:new FormControl(""),
      Media_xLargImageUrl:new FormControl(""),
      Media_LargImageUrl:new FormControl(""),
      Media_MediumImageUrl:new FormControl(""),
      Media_SamllImageUrl:new FormControl(""),
    });
  }

  getMedias() {
   // const headers = new HttpHeaders({
   //   Authorization: `bearer ${localStorage.getItem("token")}`
    //});
    return this.http.get(
      `${systemSettings.serverURL}/media/getAll`,
      //{ headers: headers }
    );
  }
  addMedia(xlImage: File,lImage: File,mImage: File,sImage: File, body): Observable<boolean> {
    const endPoint1 = `${systemSettings.serverURL}/media/addMedia`;
    const formData: FormData = new FormData();
    formData.append("xlImage", xlImage, xlImage.name);
    formData.append("lImage", lImage, lImage.name);
    formData.append("mImage", mImage, mImage.name);
    formData.append("sImage", sImage, sImage.name);
    formData.append("Media_Type", body.Media_Type);
    formData.append("Media_Title", body.Media_Title);
    formData.append("Media_MetaTags", body.Media_MetaTags);
    formData.append("Media_AlternativeText", body.Media_AlternativeText);
    formData.append("Media_Describtion", body.Media_Describtion);

    //const headers = new HttpHeaders({
    //  Authorization: `bearer ${localStorage.getItem("token")}`
    //});
    return this.http.post(endPoint1, formData).pipe(
      map((response: any) => {
        if (response.message == true) return true;
        else return false;
      })
    );
  }
  updateMedia(xlImage: File,lImage: File,mImage: File,sImage: File, body) {
    const endPoint1 = `${systemSettings.serverURL}/media/editMediaById`;
    const formData: FormData = new FormData();
    formData.append("xlImage", xlImage, xlImage.name);
    formData.append("lImage", lImage, lImage.name);
    formData.append("mImage", mImage, mImage.name);
    formData.append("sImage", sImage, sImage.name);
    formData.append("Media_Type", body.Media_Type);
    formData.append("Media_Title", body.Media_Title);
    formData.append("Media_MetaTags", body.Media_MetaTags);
    formData.append("Media_AlternativeText", body.Media_AlternativeText);
    formData.append("Media_Describtion", body.Media_Describtion); 
    formData.append("_id", body._id);
    console.log("dataTOsend",formData)
    return this.http.post(endPoint1, formData).pipe(
      map((response: any) => {
        console.log("response",response)
        if (response.message == true) return true;
        else return false;
      })
    );
  }
  popualteForm(media) {
    console.log("media", media);
    this.form.setValue({
      Media_Type: media.Media_Type || "",
      Media_Title: media.Media_Title || "",
      Media_MetaTags: media.Media_MetaTags || "",
      Media_AlternativeText: media.Media_AlternativeText || "",
      Media_Describtion:media.Media_Describtion,
      Media_xLargImageUrl:media.Media_xLargImageUrl,
      Media_LargImageUrl:media.Media_LargImageUrl,
      Media_MediumImageUrl:media.Media_MediumImageUrl,
      Media_SamllImageUrl:media.Media_SamllImageUrl,
    });
  }
}
