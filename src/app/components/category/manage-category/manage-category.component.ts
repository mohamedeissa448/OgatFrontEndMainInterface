import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { CategoryService } from '../services/category.service';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {

  categories;
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
    private categoryService: CategoryService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    if(this.authService.currentUser.User_Permissions.includes('canViewCategories'))
      this.initialize();
  }
  initialize() {
    this.categoryService.getCategories().subscribe((categories: []) => {
      this.isLoading = false;
      this.categories = new MatTableDataSource(categories);
      this.categories.sort = this.sort;
      this.categories.paginator = this.paginator;
    });
  }
  onAdd() {
    this.categoryService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Category" };
    let dialogRef=this.dialog.open(CategoryFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    this.categoryService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Category",id:element._id };

    let dialogRef=this.dialog.open(CategoryFormComponent, dialogConfig);
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
      this.categories.filter = this.searchKey.trim().toLowerCase();
  }

}
