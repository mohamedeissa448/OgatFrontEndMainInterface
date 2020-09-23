import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { ShippingCompanyService } from '../services/shipping-company.service';
import { ShippingCompanyFormComponent } from '../shipping-company-form/shipping-company-form.component';
import { ShippingCompanyContactComponent } from '../shipping-company-contact/shipping-company-contact.component';
import { ShippingCompanyContractComponent } from '../shipping-company-contract/shipping-company-contract.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-manage-shipping-company',
  templateUrl: './manage-shipping-company.component.html',
  styleUrls: ['./manage-shipping-company.component.css']
})
export class ManageShippingCompanyComponent implements OnInit {

  isLoading=true
  public shippingCompanies;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Code","Name","Contacts","Contracts","Active", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private shippingCompanyService: ShippingCompanyService,
    public authService :AuthService

  ) {}

  ngOnInit() {
    if(this.authService.currentUser.User_Permissions.includes('canViewShippingCompanies'))
      this.initializeTable();
  }
  initializeTable() {
    this.shippingCompanyService.getShippingCompanies().subscribe((shippingCompanies: any) => {
      this.isLoading = false;
      this.shippingCompanies = new MatTableDataSource(shippingCompanies);
      this.shippingCompanies.sort = this.sort;
      this.shippingCompanies.paginator = this.paginator;
    });
  }
  onAdd() {
    this.shippingCompanyService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Add New Shipping Company" };
    let dalogRef=this.dialog.open(ShippingCompanyFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  onEdit(element) {
  
    this.shippingCompanyService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Edit A Shipping Company",id:element._id,ShippingCompany_Code:element.ShippingCompany_Code };

    let dalogRef=this.dialog.open(ShippingCompanyFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.shippingCompanies.filter = this.searchKey.trim().toLowerCase();
  }
  openContacts(element){
    console.log("open contacts")
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Shipping Company's Contacts",id:element._id,ShippingCompany_Code:element.ShippingCompany_Code,ShippingCompany_Name:element.ShippingCompany_Name };

    let dalogRef=this.dialog.open(ShippingCompanyContactComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  openContracts(element){
    console.log("open contacts")
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Shipping Company's Contacts",id:element._id,ShippingCompany_Code:element.ShippingCompany_Code,ShippingCompany_Name:element.ShippingCompany_Name };

    let dalogRef=this.dialog.open(ShippingCompanyContractComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

}
