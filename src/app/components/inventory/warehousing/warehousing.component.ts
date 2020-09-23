import { Component, OnInit, ViewChild } from '@angular/core';
import { WarehousingService } from "../services/warehousing.service"
import { MatPaginator, MatTableDataSource, MatTreeNestedDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ToastService } from "../../../services/toast.service";
import { StoragePlacesService } from '../services/storage-places.service';
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
  selector: 'app-warehousing',
  templateUrl: './warehousing.component.html',
  styleUrls: ['./warehousing.component.css']
})
export class WarehousingComponent implements OnInit {
  TREE_DATA: StorageHierarchy[] =[];
  treeControl = new NestedTreeControl<StorageHierarchy>(node => node.Childrens);
  dataSource = new MatTreeNestedDataSource<StorageHierarchy>();
  SelectedStoreCode: any;
  StoreLocations: any = [];
  FirstLevelTitle: any = "";
  selectedStoreLocation: any;
  StorageItemsList: any;
  SelectedPath: string;
  constructor(private toastService: ToastService, private storagePlacesService: StoragePlacesService, 
    private WarehousingService:WarehousingService, public authService :AuthService) {

  }
  hasChild = (_: number, node: StorageHierarchy) => !!node.Childrens && node.Childrens.length > 0;

  isLoading = false;
  searchProductKey: string;
  UnHousedProductsList;
  UnHaouseddisplayedColumns: string[] = [
    "ProductSelect",
    "Code",
    "Name",
    "ColorVariant",
    "SizeVariant",
    "StoreQuantity"
  ];
  ProductSelection:any;
  @ViewChild('Productpaginator', {static: false,  read: MatPaginator}) Productpaginator: MatPaginator;
  

  ngOnInit() {
    this.storagePlacesService.getStoreDocuments().subscribe((storeDocuments: []) => {
      this.StorageItemsList = storeDocuments;
      this.StoreLocations = storeDocuments.filter((it:any) => isNull(it.StoragePlace_Parent));
      this.SelectedStoreCode = this.StoreLocations[0]._id;
      this.FirstLevelTitle = this.StoreLocations[0].StoragePlace_SubLevelTitle;
      let storageHierarchy = this.storagePlacesService.buildStorePlaceHierarchy(storeDocuments,this.SelectedStoreCode)
      this.TREE_DATA = storageHierarchy;
      this.dataSource.data = this.TREE_DATA;
    });
    this.getUnHousedProducts();
  }
  getUnHousedProducts(){
    this.WarehousingService.getUnHousedProducts().subscribe((dataFromServer:any)=>{
      dataFromServer.forEach(productItem => {
        productItem.ProductName = productItem.Store_Product.Product_Name;
        productItem.ProductIdentifier = productItem.Store_Product.Product_Identifier;
        productItem.ProductSize = productItem.Size_Variant.Size_Name;
        productItem.ProductColor = productItem.Color_Variant.Color_Name;

      });
      this.UnHousedProductsList = new MatTableDataSource(dataFromServer);
      this.isLoading = false;
      this.UnHousedProductsList.paginator = this.Productpaginator;
      this.ProductSelection = new SelectionModel<Element>(true, []);
   })
  }
  onSearchProductClear() {
    this.searchProductKey = "";
  }

  isAllSelected() {
    const numSelected = this.ProductSelection.selected.length;
    const numRows = this.UnHousedProductsList.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.ProductSelection.clear() :
        this.UnHousedProductsList.data.forEach(row => this.ProductSelection.select(row));
  }
  changeStoreLocation(){
    this.SelectedPath = null;
    let IndexOfSelectedStore: any = this.StoreLocations.findIndex(x => x._id === this.SelectedStoreCode)
    this.FirstLevelTitle = this.StoreLocations[IndexOfSelectedStore].StoragePlace_SubLevelTitle;
    this.updateHierarchy();
  }
  updateHierarchy(){
    this.storagePlacesService.getStoreDocuments().subscribe((storeDocuments: []) => {
      this.StorageItemsList = storeDocuments;
      let storageHierarchy = this.storagePlacesService.buildStorePlaceHierarchy(storeDocuments,this.SelectedStoreCode)
      this.TREE_DATA = storageHierarchy;
      this.dataSource.data = this.TREE_DATA;
    })
  }
  treeClicked(SelectedLocation){
    this.selectedStoreLocation = SelectedLocation;
    this.SelectedPath = this.storagePlacesService.getStoragePath(this.StorageItemsList,SelectedLocation.StoragePlace_Parent);
    this.SelectedPath = this.SelectedPath + " » " + SelectedLocation.StoragePlace_DisplayName;
  }
  applyFilter(){
    this.UnHousedProductsList.filter = this.searchProductKey.trim().toLowerCase();
    this.ProductSelection = new SelectionModel<Element>(true, []);
  }
  doNothing(){

  }
  housingItems(){
    if(!this.ProductSelection || this.ProductSelection.selected.length == 0){
      this.toastService.failed("At least one Product should be selected")
    }
    else if(!this.SelectedPath){
      this.toastService.failed("you have to select A Storage Place")
    }
    else{
      this.isLoading = true;
      this.ProductSelection.selected.forEach((element , index)=> {
        var DataToSend = {};
        DataToSend['Store_StoragePlace'] = this.selectedStoreLocation._id;
        DataToSend['_id'] = element._id;
        this.WarehousingService.housingProduct(DataToSend).subscribe((result:any)=>{
          if (result.message == true){
            if(index == this.ProductSelection.selected.length -1){
              this.getUnHousedProducts();
              this.toastService.success("Process has been done successfully");
            }
          }
          else{
            this.toastService.failed(result.error);
            this.isLoading = false;
          }
        });
      });
    }
  }
}
