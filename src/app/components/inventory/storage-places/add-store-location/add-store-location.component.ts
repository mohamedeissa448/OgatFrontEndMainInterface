import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastService } from "../../../../services/toast.service";
import { StoragePlacesService } from "../../services/storage-places.service"
import { data } from 'jquery';

@Component({
  selector: 'app-add-store-location',
  templateUrl: './add-store-location.component.html',
  styleUrls: ['./add-store-location.component.css']
})
export class AddStoreLocationComponent implements OnInit {

  constructor(
    private storagePlacesService:StoragePlacesService,
    private toastService:ToastService,
    private dialogRef: MatDialogRef<AddStoreLocationComponent>,
    @Inject(MAT_DIALOG_DATA) data){
      this.StoreLevel = data.StoreLevel;
      this.DialogTitle = data.title;
      this.ParentID = data.parentID;
      this.ParentIdentifier = data.ParentIdentifier;
  }
  StoreLevel: any = "";
  DialogTitle: any = "";
  ParentID: any = "";
  ParentIdentifier: any = "";
  isDataChanged = false;
  StoreLocationData:any = {};
  isLoading :any = false ;
  ngOnInit() {
  }
  AddStoreLocation(){
    this.isDataChanged = true;
    this.StoreLocationData.StoragePlace_Identifier = this.ParentIdentifier + this.StoreLocationData.StoragePlace_Identifier;
    if(this.StoreLevel=="SubLevel")
      this.StoreLocationData.StoragePlace_Parent = this.ParentID;
    console.log(this.StoreLocationData)
    this.storagePlacesService.addStoreLocation(this.StoreLocationData).subscribe(dataFromServer=>{
      if(dataFromServer){
        this.toastService.success("Store location Saved Successfully");
        this.StoreLocationData = {}
      }
      else{
        this.toastService.failed("Faild to save this store location")
      }
    });
  }
  forceParentIdentifier(){

  }
  doNothing(){

  }
  close() {
    this.dialogRef.close({DataChanged:this.isDataChanged,StoreLevel:this.StoreLevel});
  }
}
