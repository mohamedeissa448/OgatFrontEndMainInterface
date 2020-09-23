import { Component, OnInit, Inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent implements OnInit {

  id;
  title;
  constructor(
    public countryService: CountryService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<CountryFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  onClear() {
    this.countryService.form.reset();
  }

  onSubmit() {
    if (this.countryService.form.valid) {
      //on adding country
      if (this.title === "Add New Country") {
        this.countryService.addCountry(
          this.countryService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Country") {
        //update country
        this.countryService.updateCountry(this.countryService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.countryService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.countryService.form.reset();
    this.dialogRef.close();
  }


}
