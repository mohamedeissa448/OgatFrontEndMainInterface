import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { ProductMaterialService } from '../services/product-material.service';
import { ProductMaterialFormComponent } from './product-material-form/product-material-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-product-material',
  templateUrl: './product-material.component.html',
  styleUrls: ['./product-material.component.css']
})
export class ProductMaterialComponent implements OnInit {

  productMaterials;
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
    private productMaterialService: ProductMaterialService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.productMaterialService.getProductMaterials().subscribe((productMaterials: []) => {
      this.isLoading = false;
      this.productMaterials = new MatTableDataSource(productMaterials);
      this.productMaterials.sort = this.sort;
      this.productMaterials.paginator = this.paginator;
    });
  }
  onAdd() {
    this.productMaterialService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Product Material" };
    let dialogRef=this.dialog.open(ProductMaterialFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    this.productMaterialService.popualteForm(element)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Product Material",id:element._id };

    let dialogRef=this.dialog.open(ProductMaterialFormComponent, dialogConfig);
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
      this.productMaterials.filter = this.searchKey.trim().toLowerCase();
  }


}
