import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { ColorVariantService } from '../services/color-variant.service';
import { ColorVariantFormComponent } from './color-variant-form/color-variant-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-color-variant',
  templateUrl: './color-variant.component.html',
  styleUrls: ['./color-variant.component.css']
})
export class ColorVariantComponent implements OnInit {
  isLoading=true
  public colors;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Name", "Description", "Identifier", "Image","Active", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private colorService: ColorVariantService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initializeTable();
  }
  initializeTable() {
    this.colorService.getColors().subscribe((colors: any) => {
      this.isLoading = false;
      this.colors = new MatTableDataSource(colors);
      this.colors.sort = this.sort;
      this.colors.paginator = this.paginator;
    });
  }
  onAdd() {
    this.colorService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Color" };
    let dalogRef=this.dialog.open(ColorVariantFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  onEdit(element) {
  
    this.colorService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit A Color", imageUrl: element.Color_Icon_Image_Url,id:element._id };

    this.dialog.open(ColorVariantFormComponent, dialogConfig);
    let dalogRef=this.dialog.open(ColorVariantFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.colors.filter = this.searchKey.trim().toLowerCase();
  }

}
