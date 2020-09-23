import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog,MatDialogConfig} from '@angular/material';
import { StoragePlacesService } from '../services/storage-places.service';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import { AddStoreLocationComponent } from './add-store-location/add-store-location.component';
import { isNull } from 'util';
import { AuthService } from '../../../authentication/services/auth.service';

interface StorageHierarchy {
  StoragePlace_DisplayName : String;
  StoragePlace_Identifier  : String;
  StoragePlace_Parent      : String;
  _id                      : String;
  __v?                     : Number;
  Childrens?               : StorageHierarchy[];

}


@Component({
  selector: 'app-storage-places',
  templateUrl: './storage-places.component.html',
  styleUrls: ['./storage-places.component.css']
})
export class StoragePlacesComponent implements OnInit {
  TREE_DATA: StorageHierarchy[] =[];
  SelectedStoreCode: any;
  StoreLocations: any = [];
  FirstLevelTitle: any = "";
  isLoading = true;
  treeControl = new NestedTreeControl<StorageHierarchy>(node => node.Childrens);
  dataSource = new MatTreeNestedDataSource<StorageHierarchy>();
  constructor(
    private dialog: MatDialog,
    private storagePlacesService: StoragePlacesService,
    public authService :AuthService
  ) {
    
  }
  
  hasChild = (_: number, node: StorageHierarchy) => !!node.Childrens && node.Childrens.length > 0;

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.storagePlacesService.getStoreDocuments().subscribe((storeDocuments: []) => {
      this.StoreLocations = storeDocuments.filter((it:any) => isNull(it.StoragePlace_Parent));
      this.SelectedStoreCode = this.StoreLocations[0]._id;
      this.FirstLevelTitle = this.StoreLocations[0].StoragePlace_SubLevelTitle;
      let storageHierarchy = this.storagePlacesService.buildStorePlaceHierarchy(storeDocuments,this.SelectedStoreCode)
      this.TREE_DATA = storageHierarchy;
      this.dataSource.data = this.TREE_DATA;
      this.isLoading = false;
    });
  }
  updateHierarchy(){
    this.storagePlacesService.getStoreDocuments().subscribe((storeDocuments: []) => {
      let storageHierarchy = this.storagePlacesService.buildStorePlaceHierarchy(storeDocuments,this.SelectedStoreCode)
      this.TREE_DATA = storageHierarchy;
      this.dataSource.data = this.TREE_DATA;
    })
  }
  changeStoreLocation(){
    if(this.SelectedStoreCode == 0){
      return;
    }
    let IndexOfSelectedStore: any = this.StoreLocations.findIndex(x => x._id === this.SelectedStoreCode)
    this.FirstLevelTitle = this.StoreLocations[IndexOfSelectedStore].StoragePlace_SubLevelTitle;
    this.updateHierarchy();
  }
  SelectedStoreIdentifier(){
    let IndexOfSelectedStore: any = this.StoreLocations.findIndex(x => x._id === this.SelectedStoreCode)
    return this.StoreLocations[IndexOfSelectedStore].StoragePlace_Identifier;
  }
  AddNewStoreLocation(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90%";
    dialogConfig.data = { title: "Add New Store Location" , StoreLevel: "StoreLocation",ParentIdentifier:""};
    let dialogRef = this.dialog.open(AddStoreLocationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
    })
  }
  AddSubLevelStoreLocation(levelName,parentID,ParentIdentifier){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90%";
    dialogConfig.data = { title: "Add New "+ levelName , StoreLevel: "SubLevel",parentID: parentID,ParentIdentifier: ParentIdentifier};
    console.log(dialogConfig.data)
    let dialogRef = this.dialog.open(AddStoreLocationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      if(data.DataChanged && data.StoreLevel == "SubLevel"){
        this.updateHierarchy();
      }
    })
  }
}
