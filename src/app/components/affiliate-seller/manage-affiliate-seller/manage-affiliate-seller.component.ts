import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { AffiliateSellerService } from '../services/affiliate-seller.service';
import { AffiliateSellerFormComponent } from '../affiliate-seller-form/affiliate-seller-form.component';
import { AffiliateSellerContactComponent } from '../affiliate-seller-contact/affiliate-seller-contact.component';
import { PayToAffiliateComponent } from '../pay-to-affiliate/pay-to-affiliate.component';
import { ChangeAffiliatePercentageComponent } from '../change-affiliate-percentage/change-affiliate-percentage.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-manage-affiliate-seller',
  templateUrl: './manage-affiliate-seller.component.html',
  styleUrls: ['./manage-affiliate-seller.component.css']
})
export class ManageAffiliateSellerComponent implements OnInit {

  
  isLoading=true
  public affiliateSellers;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Code","Name", "Type","Contacts","Pay","Change Revenue Percentage","Active", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private affiliateSellerService: AffiliateSellerService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    if(this.authService.currentUser.User_Permissions.includes('canViewAffilateSellers'))
      this.initializeTable();
  }
  initializeTable() {
    this.affiliateSellerService.getAffiliateSellers().subscribe((affiliateSellers: any) => {
      this.isLoading = false;
      this.affiliateSellers = new MatTableDataSource(affiliateSellers);
      this.affiliateSellers.sort = this.sort;
      this.affiliateSellers.paginator = this.paginator;
    });
  }
  onAdd() {
    this.affiliateSellerService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Add New Affiliate Seller" };
    let dalogRef=this.dialog.open(AffiliateSellerFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  onEdit(element) {
  
    this.affiliateSellerService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Edit An Affiliate Seller",id:element._id,AffiliateSeller_Code:element.AffiliateSeller_Code };

    let dalogRef=this.dialog.open(AffiliateSellerFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.affiliateSellers.filter = this.searchKey.trim().toLowerCase();
  }
  openContacts(element){
    console.log("open contacts")
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "AffiliateSeller's Contacts",id:element._id,AffiliateSeller_Code:element.AffiliateSeller_Code,AffiliateSeller_Name:element.AffiliateSeller_Name };

    let dalogRef=this.dialog.open(AffiliateSellerContactComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

  openToPay(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Pay to AffiliateSeller",id:element._id,AffiliateSeller_Code:element.AffiliateSeller_Code,AffiliateSeller_Name:element.AffiliateSeller_Name };

    let dalogRef=this.dialog.open(PayToAffiliateComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

  openToChangeRevenuePercentage(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Change Affiliate Percentage",id:element._id,AffiliateSeller_Code:element.AffiliateSeller_Code,AffiliateSeller_Name:element.AffiliateSeller_Name };

    let dalogRef=this.dialog.open(ChangeAffiliatePercentageComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

}
