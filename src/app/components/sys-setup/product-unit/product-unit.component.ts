import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { ProductUnitService } from '../services/product-unit.service';
import { ProductUnitFormComponent } from './product-unit-form/product-unit-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-product-unit',
  templateUrl: './product-unit.component.html',
  styleUrls: ['./product-unit.component.css']
})
export class ProductUnitComponent implements OnInit {

  productUnits;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Name",
    "Description",
    "Active",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private productUnitService: ProductUnitService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.productUnitService.getProductUnits().subscribe((productUnits: []) => {
      this.isLoading = false;
      this.productUnits = new MatTableDataSource(productUnits);
      this.productUnits.sort = this.sort;
      this.productUnits.paginator = this.paginator;
    });
  }
  onAdd() {
    this.productUnitService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Product Unit" };
    let dialogRef=this.dialog.open(ProductUnitFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    this.productUnitService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Product Unit",id:element._id };

    let dialogRef=this.dialog.open(ProductUnitFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    if (this.searchKey)
      this.productUnits.filter = this.searchKey.trim().toLowerCase();
  }


}
