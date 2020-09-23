import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { CountryService } from '../services/country.service';
import { CountryFormComponent } from './country-form/country-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries;
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
    private countryService: CountryService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.countryService.getCountries().subscribe((countries: []) => {
      this.isLoading = false;
      this.countries = new MatTableDataSource(countries);
      this.countries.sort = this.sort;
      this.countries.paginator = this.paginator;
    });
  }
  onAdd() {
    this.countryService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Country" };
    let dialogRef=this.dialog.open(CountryFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    this.countryService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Country",id:element._id };

    let dialogRef=this.dialog.open(CountryFormComponent, dialogConfig);
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
      this.countries.filter = this.searchKey.trim().toLowerCase();
  }


}
