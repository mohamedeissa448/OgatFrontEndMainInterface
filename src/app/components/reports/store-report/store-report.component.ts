import { Component, OnInit } from '@angular/core';
import { StoreReportService } from '../services/store-report.service';

@Component({
  selector: 'app-store-report',
  templateUrl: './store-report.component.html',
  styleUrls: ['./store-report.component.css']
})
export class StoreReportComponent implements OnInit {

  isLoading = true
  public storeProducts;

  constructor(
    private storeReportService: StoreReportService
  ) {}

  ngOnInit() {
    this.storeReportService.getStorProductMatrix().subscribe((ProductsMatrixFromServer :any)=>{
      this.isLoading = false;
      this.storeProducts = ProductsMatrixFromServer.products;
      console.log(this.storeProducts)
      
    });
     
  }
  getCountOfSize(sizesArray,sizeToGet){
    var indexOfTheSize = sizesArray.findIndex(item => item.Size === sizeToGet);
    if(indexOfTheSize>=0){
      console.log(sizesArray[indexOfTheSize].Size)
      return sizesArray[indexOfTheSize].Quantity
    }
    else{
      return '0'
    }
  }

}
