import { NgModule } from "@angular/core";
import { routing } from "./sys-setup.routing";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule, MatNativeDateModule, MatProgressSpinnerModule, MatProgressBarModule } from "@angular/material";
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
import { SizeVariantsComponent } from './size-variants/size-variants.component';
import { SizeVariantsFormComponent } from './size-variants/size-variants-form/size-variants-form.component';
import { ProductUnitComponent } from './product-unit/product-unit.component';
import { ProductUnitFormComponent } from './product-unit/product-unit-form/product-unit-form.component';
import { ColorVariantComponent } from './color-variant/color-variant.component';
import { ColorVariantFormComponent } from './color-variant/color-variant-form/color-variant-form.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProductMaterialComponent } from './product-material/product-material.component';
import { ProductMaterialFormComponent } from './product-material/product-material-form/product-material-form.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ClassComponent } from './class/class.component';
import { ClassFormComponent } from './class/class-form/class-form.component';
import { CountryComponent } from './country/country.component';
import { CountryFormComponent } from './country/country-form/country-form.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PaymentMethodsFormComponent } from './payment-methods/payment-methods-form/payment-methods-form.component';
import { WaysOfDeliveryComponent } from './ways-of-delivery/ways-of-delivery.component';
import { WaysOfDeliveryFormComponent } from './ways-of-delivery/ways-of-delivery-form/ways-of-delivery-form.component';
import { ProvinceComponent } from './province/province.component';
import { ProvinceFormComponent } from './province/province-form/province-form.component';
import { ReasonOfReturnOrderComponent } from './reason-of-return-order/reason-of-return-order.component';
import { ReasonOfCancelOrderComponent } from './reason-of-cancel-order/reason-of-cancel-order.component';
import { ReturnFormComponent } from './reason-of-return-order/return-form/return-form.component';
import { CancelFormComponent } from './reason-of-cancel-order/cancel-form/cancel-form.component';

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
    ColorPickerModule
  ],
  declarations: [
  SizeVariantsComponent,
  SizeVariantsFormComponent,
  ProductUnitComponent,
  ProductUnitFormComponent,
  ColorVariantComponent,
  ColorVariantFormComponent,
  ProductMaterialComponent,
  ProductMaterialFormComponent,
  ClassComponent,
  ClassFormComponent,
  CountryComponent,
  CountryFormComponent,
  PaymentMethodsComponent,
  PaymentMethodsFormComponent,
  WaysOfDeliveryComponent,
  WaysOfDeliveryFormComponent,
  ProvinceComponent,
  ProvinceFormComponent,
  ReasonOfReturnOrderComponent,
  ReasonOfCancelOrderComponent,
  ReturnFormComponent,
  CancelFormComponent,
  
],
  entryComponents: [
    SizeVariantsFormComponent,
    ProductUnitFormComponent,
    ColorVariantFormComponent,
    ProductMaterialFormComponent,
    ClassFormComponent,
    CountryFormComponent,
    PaymentMethodsFormComponent,
    WaysOfDeliveryFormComponent,
    ProvinceFormComponent,
    ReturnFormComponent,
    CancelFormComponent
  ],
  exports: [
    ColorPickerModule
  ],
})
export class SysSetupModule {}
