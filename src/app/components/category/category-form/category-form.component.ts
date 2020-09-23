import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  id;
  title;
  constructor(
    public categoryService: CategoryService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  onClear() {
    this.categoryService.form.reset();
  }

  onSubmit() {
    if (this.categoryService.form.valid) {
      //on adding country
      if (this.title === "Add New Category") {
        this.categoryService.addCategory(
          this.categoryService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Category") {
        //update country
        this.categoryService.updateCategory(this.categoryService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.categoryService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.categoryService.form.reset();
    this.dialogRef.close();
  }


}
