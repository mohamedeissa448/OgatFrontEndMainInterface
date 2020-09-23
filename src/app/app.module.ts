import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { RichTextEditorAllModule } from "@syncfusion/ej2-angular-richtexteditor";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgxGalleryModule } from "ngx-gallery";
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from "./layout/layout.module";
//import * as $ from 'jquery';
import { from } from "rxjs";
//Ogat Modules
//import { PrintModule} from "./print/print.module"
import { DashboardModule } from "./components/dashboard/dashboard.module";
import { SysSetupModule } from "./components/sys-setup/sys-setup.module";
import { MediaModule } from './components/media/media.module';
import { ProductModule } from './components/product/product.module';
import { SupplierModule } from './components/supplier/supplier.module';
import { CategoryModule } from './components/category/category.module';
import { ManageUserstModule } from './components/users/manage-users.module';
import { InventoryModule } from './components/inventory/inventory.module'
import { ShippingCompanyModule } from './components/shipping-company/shipping-company.module';
import { CustomerModule } from './components/customer/customer.module';
import { AffiliateSellerModule } from './components/affiliate-seller/affiliate-seller.module';
import { OrdersModule } from './components/orders/orders.module';
import { ItemSelectChangerDirective } from './directives/item-select-changer.directive';
import { ReportsModule } from './components/reports/reports.module';

@NgModule({
  declarations: [AppComponent,ItemSelectChangerDirective],
  imports: [
    BrowserModule,
    // Ogat Modules
    //PrintModule,
    DashboardModule,
    SysSetupModule,
    MediaModule,
    ProductModule,
    SupplierModule,
    CategoryModule,
    ManageUserstModule,
    InventoryModule,
    ShippingCompanyModule,
    CustomerModule,
    AffiliateSellerModule,
    OrdersModule,
    ReportsModule,
    // end of Ogat Modules
    routing,
    HttpClientModule,
    NgbModule,
    LayoutModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RichTextEditorAllModule,
    NgMultiSelectDropDownModule.forRoot(),
    LeafletModule.forRoot(),
    NgxGalleryModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
