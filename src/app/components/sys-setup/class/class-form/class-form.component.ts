import { ClassService } from '../../services/class.service';
import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements OnInit {

  id;
  title;
  constructor(
    public classService: ClassService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ClassFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  onClear() {
    this.classService.form.reset();
  }

  onSubmit() {
    if (this.classService.form.valid) {
      //on adding material
      if (this.title === "Add New Class") {
        this.classService.addClass(
          this.classService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Class") {
        //update material
        this.classService.updateClass(this.classService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.classService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.classService.form.reset();
    this.dialogRef.close();
  }



}
