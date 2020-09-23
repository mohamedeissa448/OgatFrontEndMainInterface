import { Component, OnInit, Inject } from '@angular/core';
import { ProductUnitService } from '../../services/product-unit.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-product-unit-form',
  templateUrl: './product-unit-form.component.html',
  styleUrls: ['./product-unit-form.component.css']
})
export class ProductUnitFormComponent implements OnInit {
  id;
  title;
  constructor(
    public productUnitsService: ProductUnitService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ProductUnitFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  onClear() {
    this.productUnitsService.form.reset();
  }

  onSubmit() {
    if (this.productUnitsService.form.valid) {
      //on adding size
      if (this.title === "Add New Product Unit") {
        this.productUnitsService.addProductUnit(
          this.productUnitsService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Product Unit") {
        //update size
        this.productUnitsService.updateProductUnit(this.productUnitsService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.productUnitsService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.productUnitsService.form.reset();
    this.dialogRef.close();
  }


}
