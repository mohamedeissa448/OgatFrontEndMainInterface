import { NgModule } from "@angular/core";
import { routing } from "./inventory.routing";
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
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { NgxBarcodeModule } from 'ngx-barcode';
import {NgxPrintModule} from 'ngx-print';

//Increase Inventory
import { IncreaseInventoryComponent } from './increase-inventory/increase-inventory.component';
import { IncreaseInventoryAddFormComponent } from './increase-inventory/increase-inventory-add-form/increase-inventory-add-form.component';
import { IncreaseInventoryEditFormComponent } from './increase-inventory/increase-inventory-edit-form/increase-inventory-edit-form.component';
//DecreaseInventory
import { DecreaseInventoryComponent } from './decrease-inventory/decrease-inventory.component';
import { DecreaseInventoryAddFormComponent } from './decrease-inventory/decrease-inventory-add-form/decrease-inventory-add-form.component';
import { DecreaseInventoryEditFormComponent } from './decrease-inventory/decrease-inventory-edit-form/decrease-inventory-edit-form.component';
//StoragePlaces
import { StoragePlacesComponent } from './storage-places/storage-places.component';
import { AddStoreLocationComponent } from './storage-places/add-store-location/add-store-location.component';
import { WarehousingComponent } from './warehousing/warehousing.component';
import { BarcodePrintComponent } from './barcode-print/barcode-print.component';
import { PrintPreviewComponent } from './barcode-print/print-preview/print-preview.component';
import { ManageBillComponent } from './manage-bill/manage-bill.component';
import { BillAddFormComponent } from './manage-bill/bill-add-form/bill-add-form.component';
import { EditBillFormComponent } from './manage-bill/edit-bill-form/edit-bill-form.component';
import { ManageReturnBillComponent } from './manage-return-bill/manage-return-bill.component';
import { EditReturnBillFormComponent } from './manage-return-bill/edit-return-bill-form/edit-return-bill-form.component';
import { AddReturnBillFormComponent } from './manage-return-bill/add-return-bill-form/add-return-bill-form.component';


@NgModule({
  imports: [
    BrowserModule,
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
    MatTreeModule,
    MatCheckboxModule,
    NgxBarcodeModule,
    NgxPrintModule,
    MatAutocompleteModule
  ],
  declarations: [
    IncreaseInventoryComponent,
    IncreaseInventoryAddFormComponent,
    IncreaseInventoryEditFormComponent,
    DecreaseInventoryComponent,
    DecreaseInventoryAddFormComponent,
    DecreaseInventoryEditFormComponent,
    StoragePlacesComponent,
    AddStoreLocationComponent,
    WarehousingComponent,
    BarcodePrintComponent,
    PrintPreviewComponent,
    ManageBillComponent,
    BillAddFormComponent,
    EditBillFormComponent,
    ManageReturnBillComponent,
    EditReturnBillFormComponent,
    AddReturnBillFormComponent
],
  entryComponents: [
    IncreaseInventoryAddFormComponent,
    IncreaseInventoryEditFormComponent,
    DecreaseInventoryAddFormComponent,
    DecreaseInventoryEditFormComponent,
    AddStoreLocationComponent,
    PrintPreviewComponent,
    BillAddFormComponent,
    EditBillFormComponent,
    EditReturnBillFormComponent,
    AddReturnBillFormComponent
  ]
})
export class InventoryModule {}
