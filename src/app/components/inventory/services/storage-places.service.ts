import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoragePlacesService {

  constructor(private http: HttpClient) {

  }

  getStoreDocuments() {
    return this.http.get(`${systemSettings.serverURL}/storagePlaces/getAll`)
  }

  addStoreLocation(dataToSend) {
    return this.http
      .post(`${systemSettings.serverURL}/storagePlaces/addStoragePlace`, dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  buildStorePlaceHierarchy(StorePlacesArray,SelectedStoreCode){
    let storageHierarchy = StorePlacesArray.filter((it:any) => it.StoragePlace_Parent == SelectedStoreCode);
    storageHierarchy.forEach((firestLevelitem:any)=>{
      firestLevelitem.Childrens = [];
      firestLevelitem.Childrens = StorePlacesArray.filter((it:any) => it.StoragePlace_Parent == firestLevelitem._id);
      firestLevelitem.Childrens.forEach((SecondLevelitem:any)=>{
        SecondLevelitem.Childrens = [];
        SecondLevelitem.Childrens = StorePlacesArray.filter((it:any) => it.StoragePlace_Parent == SecondLevelitem._id);
        SecondLevelitem.Childrens.forEach((ThairdLevelitem:any)=>{
          ThairdLevelitem.Childrens = [];
          ThairdLevelitem.Childrens = StorePlacesArray.filter((it:any) => it.StoragePlace_Parent == ThairdLevelitem._id); 
          ThairdLevelitem.Childrens.forEach((FourthLevelitem:any)=>{
            FourthLevelitem.Childrens = [];
            FourthLevelitem.Childrens = StorePlacesArray.filter((it:any) => it.StoragePlace_Parent == FourthLevelitem._id); 
            FourthLevelitem.Childrens.forEach((FifthLevelitem:any)=>{
              FifthLevelitem.Childrens = [];
              FifthLevelitem.Childrens = StorePlacesArray.filter((it:any) => it.StoragePlace_Parent == FifthLevelitem._id); 
            })
          })
        })
      })
    })
    return storageHierarchy;
  }
  getStoragePath(StorePlacesArray, ParentID){
    let PathArray = [];
    let IndexOfFirstParent: any = StorePlacesArray.findIndex(x => x._id === ParentID);
    PathArray.push(StorePlacesArray[IndexOfFirstParent].StoragePlace_DisplayName);
    if(StorePlacesArray[IndexOfFirstParent].StoragePlace_Parent){
      let IndexOfSecondParent: any = StorePlacesArray.findIndex(x => x._id === StorePlacesArray[IndexOfFirstParent].StoragePlace_Parent);
      PathArray.push(StorePlacesArray[IndexOfSecondParent].StoragePlace_DisplayName);
      if(StorePlacesArray[IndexOfSecondParent].StoragePlace_Parent){
        let IndexOfThirdParent: any = StorePlacesArray.findIndex(x => x._id === StorePlacesArray[IndexOfSecondParent].StoragePlace_Parent);
        PathArray.push(StorePlacesArray[IndexOfThirdParent].StoragePlace_DisplayName);
        if(StorePlacesArray[IndexOfThirdParent].StoragePlace_Parent){
          let IndexOfFourthParent: any = StorePlacesArray.findIndex(x => x._id === StorePlacesArray[IndexOfThirdParent].StoragePlace_Parent);
          PathArray.push(StorePlacesArray[IndexOfFourthParent].StoragePlace_DisplayName);
          if(StorePlacesArray[IndexOfFourthParent].StoragePlace_Parent){
            let IndexOfFifthParent: any = StorePlacesArray.findIndex(x => x._id === StorePlacesArray[IndexOfFourthParent].StoragePlace_Parent);
            PathArray.push(StorePlacesArray[IndexOfFifthParent].StoragePlace_DisplayName);
          }
        }
      }
    }
    PathArray = PathArray.reverse();
    return PathArray.join(" » ")
  }
  getOneById(ID){
    return this.http.post(`${systemSettings.serverURL}/store/getOneById`,{ _id : ID })
  }
  updateStoreDocument(updatedStore,id) {
    console.log("updated", updatedStore);

   return this.http
      .post(`${systemSettings.serverURL}/store/editStoreById`, {
        updatedStore:updatedStore,
        _id: id
      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
 

  /**********************Helpful Routes */
  getProducts() {
    return this.http.get(`${systemSettings.serverURL}/products/getAll`)
  }
  getSizes() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/sizes/getAllSizes`)
  }
  
  getColorVariants(){
    return this.http.get(`${systemSettings.serverURL}/sys-setup/colors/getAllProductColors`)
  }
}
