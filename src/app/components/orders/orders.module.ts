import { NgModule } from "@angular/core";
import { routing } from "./orders.routing";
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
import { MatChipsModule } from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {MatAutocompleteModule} from "@angular/material";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';

import { MyOrdersComponent } from './my-orders/my-orders.component'
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrderFormComponent } from './manage-orders/order-form/order-form.component';
import { OrderStatusComponent } from './my-orders/order-status/order-status.component';
import { ShippingFormComponent } from './my-orders/shipping-form/shipping-form.component';
import { AssignedOrdersComponent } from './assigned-orders/assigned-orders.component';
import { OrderDetailsComponent } from './assigned-orders/order-details/order-details.component';
import { ShippedOrdersComponent } from './shipped-orders/shipped-orders.component';
import { ReturnOrCollectOrderComponent } from './shipped-orders/return-or-collect-order/return-or-collect-order.component';
import { CancelledOrdersComponent } from './cancelled-orders/cancelled-orders.component';
import { ManageReturnOrderComponent } from './manage-return-order/manage-return-order.component';
import { ReturnOrderFormComponent } from './manage-return-order/return-order-form/return-order-form.component';
import { ChangeOrderEmployeeComponent } from './manage-change-assigned-orders-employees/change-order-employee/change-order-employee.component';
import { ManageDistributeOrdersComponent } from './manage-distribute-orders/manage-distribute-orders.component';
import { RecreateOrderComponent } from './cancelled-orders/recreate-order/recreate-order.component';
import { AssignOrderToEmployeeComponent } from './manage-distribute-orders/assign-order-to-employee/assign-order-to-employee.component';
import { ManageCollectOrdersComponent } from './manage-collect-orders/manage-collect-orders.component';
import { CollectOrderFormComponent } from './manage-collect-orders/collect-order-form/collect-order-form.component';

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
    MatSliderModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatRadioModule

  ],
  declarations: [
    MyOrdersComponent,
    ManageOrdersComponent,
    OrderFormComponent,
    OrderStatusComponent,
    ShippingFormComponent,
    AssignedOrdersComponent,
    OrderDetailsComponent,
    ShippedOrdersComponent,
    ReturnOrCollectOrderComponent,
    CancelledOrdersComponent,
    ManageReturnOrderComponent,
    ReturnOrderFormComponent,
    ChangeOrderEmployeeComponent,
    ManageDistributeOrdersComponent,
    RecreateOrderComponent,
    AssignOrderToEmployeeComponent,
    ManageCollectOrdersComponent,
    CollectOrderFormComponent,
  ],
  entryComponents: [
    OrderFormComponent,
    OrderStatusComponent,
    ShippingFormComponent,
    OrderDetailsComponent,
    ReturnOrCollectOrderComponent,
    ReturnOrderFormComponent,
    ChangeOrderEmployeeComponent,
    RecreateOrderComponent,
    AssignOrderToEmployeeComponent,
    CollectOrderFormComponent
  ]
})
export class OrdersModule {}
