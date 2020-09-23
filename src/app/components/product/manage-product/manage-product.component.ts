import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { ProductService } from '../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  isLoading=true
  public products;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Name", "Identifier","Categories","Active", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    public authService :AuthService

  ) {}

  ngOnInit() {
    if(this.authService.currentUser.User_Permissions.includes('canViewProducts'))
      this.initializeTable();
  }
  initializeTable() {
    this.productService.getProducts().subscribe((products: any) => {
      this.isLoading = false;
      this.products = new MatTableDataSource(products);
      this.products.sort = this.sort;
      this.products.paginator = this.paginator;
    });
  }
  onAdd() {
    this.productService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Product" };
    let dalogRef=this.dialog.open(ProductFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  onEdit(element) {
  
    this.productService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let forViewImagesIDs=[]
    
    dialogConfig.data = { title: "Edit A Product", forViewImagesIDs:element.Product_Color_Variants,
    forDefaultViewImagesIDs:element.Product_DefaultImages_Media
    ,id:element._id };

    let dalogRef=this.dialog.open(ProductFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.products.filter = this.searchKey.trim().toLowerCase();
  }

}
