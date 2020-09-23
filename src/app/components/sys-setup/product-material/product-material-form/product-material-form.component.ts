import { ProductMaterialService } from '../../services/product-material.service';
import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-product-material-form',
  templateUrl: './product-material-form.component.html',
  styleUrls: ['./product-material-form.component.css']
})
export class ProductMaterialFormComponent implements OnInit {

  id;
  title;
  constructor(
    public productMaterialsService: ProductMaterialService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ProductMaterialFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  onClear() {
    this.productMaterialsService.form.reset();
  }

  onSubmit() {
    if (this.productMaterialsService.form.valid) {
      //on adding material
      if (this.title === "Add New Product Material") {
        this.productMaterialsService.addProductMaterial(
          this.productMaterialsService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Product Material") {
        //update material
        this.productMaterialsService.updateProductMaterial(this.productMaterialsService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.productMaterialsService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.productMaterialsService.form.reset();
    this.dialogRef.close();
  }



}
