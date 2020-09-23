import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from "../../../services/toast.service";
import { WarehousingService } from "../services/warehousing.service"
import { MatPaginator, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PrintPreviewComponent } from './print-preview/print-preview.component'
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-barcode-print',
  templateUrl: './barcode-print.component.html',
  styleUrls: ['./barcode-print.component.css']
})
export class BarcodePrintComponent implements OnInit {
  isLoading: boolean;
  SkipLableCount = 0;
  constructor( 
    private dialog: MatDialog, private toastService:ToastService, private WarehousingService:WarehousingService,
    public authService :AuthService) { 

    }
  searchProductKey: string;
  UnHousedProductsList;
  UnHaouseddisplayedColumns: string[] = [
    "ProductSelect",
    "Code",
    "Name",
    "ColorVariant",
    "SizeVariant",
    "StoreQuantity",
    "PrintQuantity",
    "Barcode"
  ];
  ProductSelection:any;
  @ViewChild('Productpaginator', {static: false,  read: MatPaginator}) Productpaginator: MatPaginator;
  
  ngOnInit() {
    this.WarehousingService.getHousedProducts().subscribe((dataFromServer:any)=>{
      dataFromServer.forEach(productItem => {
        productItem.ProductName = productItem.Store_Product.Product_Name;
        productItem.Store_PrintQuantity = productItem.Store_Quantity;
        productItem.ProductIdentifier = productItem.Store_Product.Product_Identifier;
        productItem.ProductSize = productItem.Size_Variant.Size_Name;
        productItem.ProductColor = productItem.Color_Variant.Color_Name;
        productItem.ProductBarcode = this.WarehousingService.createBarcode(productItem);
        
      });
      console.log(dataFromServer)
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
  applyFilter(){
    this.UnHousedProductsList.filter = this.searchProductKey.trim().toLowerCase();
    this.ProductSelection = new SelectionModel<Element>(true, []);
  }
  IntiatePrintItems(){
    if(!this.ProductSelection || this.ProductSelection.selected.length == 0){
      this.toastService.failed("At least one Product should be selected")
    }
    else{
      let BarcodePrintingArray = [];
      if(this.SkipLableCount || this.SkipLableCount >0){
        for (let n = 0; n < this.SkipLableCount; ++n) {
          BarcodePrintingArray.push({})
        }
      }
      this.ProductSelection.selected.forEach((element , index)=> {
        for (let n = 0; n < element.Store_PrintQuantity; ++n) {
          BarcodePrintingArray.push({
            Barcode :  element.ProductBarcode,
            Name    : element.ProductName,
            Color   : element.ProductColor,
            Size    : element.ProductSize,
            Ogat    : "Ogat"
          })
        }
        // var ItemToPrint = {};
        
        // ItemToPrint['Barcode'] = element.ProductBarcode;
        // ItemToPrint['Name'] = element.ProductName;
        // ItemToPrint['Color'] = element.ProductColor;
        // ItemToPrint['Size'] = element.ProductSize;
        // BarcodePrintingArray.push(ItemToPrint);
      });
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "90%";
      dialogConfig.data = { barcodeArray : BarcodePrintingArray };
      let dialogRef=this.dialog.open(PrintPreviewComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((data)=>{
        console.log(data);
      })
    }
  }
}
