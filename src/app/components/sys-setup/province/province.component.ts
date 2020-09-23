import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { ProvinceService } from '../services/province.service';
import { ProvinceFormComponent } from './province-form/province-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.css']
})
export class ProvinceComponent implements OnInit {

  provinces;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Name",
    "ShortCode",
    "Active",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private provinceService: ProvinceService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.provinceService.getProvinces().subscribe((provinces: []) => {
      this.isLoading = false;
      this.provinces = new MatTableDataSource(provinces);
      this.provinces.sort = this.sort;
      this.provinces.paginator = this.paginator;
    });
  }
  onAdd() {
    this.provinceService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Province" };
    let dialogRef=this.dialog.open(ProvinceFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    this.provinceService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Province",id:element._id };

    let dialogRef=this.dialog.open(ProvinceFormComponent, dialogConfig);
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
      this.provinces.filter = this.searchKey.trim().toLowerCase();
  }


}
