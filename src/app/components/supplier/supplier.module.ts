import { NgModule } from "@angular/core";
import { routing } from "./supplier.routing";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule, MatNativeDateModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule, MatSelectModule } from "@angular/material";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDividerModule } from "@angular/material/divider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from "@angular/material/card";
import { ManageSupplierComponent } from './manage-supplier/manage-supplier.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { MatChipsModule } from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import { SupplierContactComponent } from './supplier-contact/supplier-contact.component';
import { SupplierPaymentsComponent } from './supplier-payments/supplier-payments.component';
import { SupplierPaymentFormComponent } from './supplier-payment-form/supplier-payment-form.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    
    CommonModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    routing,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule, 
    MatSelectModule,
    MatChipsModule,
    MatSliderModule,
    MatAutocompleteModule
  ],
  declarations: [
    ManageSupplierComponent,
    SupplierFormComponent,
    SupplierContactComponent,
    SupplierPaymentsComponent,
    SupplierPaymentFormComponent
],
  entryComponents: [
    SupplierFormComponent,
    SupplierContactComponent,
    SupplierPaymentFormComponent
  ]
})
export class SupplierModule {}
