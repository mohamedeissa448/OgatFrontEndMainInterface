import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { SupplierService } from '../services/supplier.service';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import { SupplierContactComponent } from '../supplier-contact/supplier-contact.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-manage-supplier',
  templateUrl: './manage-supplier.component.html',
  styleUrls: ['./manage-supplier.component.css']
})
export class ManageSupplierComponent implements OnInit {

  
  isLoading=true
  public suppliers;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Code","Name", "Category","Contacts","Active", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private supplierService: SupplierService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    if(this.authService.currentUser.User_Permissions.includes('canViewSuppliers'))
      this.initializeTable();
  }
  initializeTable() {
    this.supplierService.getSuppliers().subscribe((suppliers: any) => {
      this.isLoading = false;
      this.suppliers = new MatTableDataSource(suppliers);
      this.suppliers.sort = this.sort;
      this.suppliers.paginator = this.paginator;
    });
  }
  onAdd() {
    this.supplierService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Add New Supplier" };
    let dalogRef=this.dialog.open(SupplierFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  onEdit(element) {
  
    this.supplierService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Edit A Supplier",id:element._id,Supplier_Code:element.Supplier_Code };

    let dalogRef=this.dialog.open(SupplierFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.suppliers.filter = this.searchKey.trim().toLowerCase();
  }
  openContacts(element){
    console.log("open contacts")
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Supplier's Contacts",id:element._id,Supplier_Code:element.Supplier_Code,Supplier_Name:element.Supplier_Name };

    let dalogRef=this.dialog.open(SupplierContactComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

}
