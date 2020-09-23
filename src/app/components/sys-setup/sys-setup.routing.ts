import { SysSetupAuthGuardService } from "./../../authentication/services/sys-setup-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import{SizeVariantsComponent}from"./size-variants/size-variants.component"
import { ProductUnitComponent } from './product-unit/product-unit.component';
import { ColorVariantComponent } from './color-variant/color-variant.component';
import { ProductMaterialFormComponent } from './product-material/product-material-form/product-material-form.component';
import { ProductMaterialComponent } from './product-material/product-material.component';
import { ClassComponent } from './class/class.component';
import { CountryComponent } from './country/country.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { WaysOfDeliveryComponent } from './ways-of-delivery/ways-of-delivery.component';
import { ProvinceComponent } from './province/province.component';
import { ReasonOfReturnOrderComponent } from './reason-of-return-order/reason-of-return-order.component';
import { ReasonOfCancelOrderComponent } from './reason-of-cancel-order/reason-of-cancel-order.component';

const routes: Routes = [
  {
    path: "sys-setup",
    children: [
      
      {
        path: "manage-size-variants",
        component: SizeVariantsComponent,
        data: { 
          title: "Ogat Store Manager » System Setup » Size Variants", 
          PageTitle: "Manage Size Variants", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-product-units",
        component: ProductUnitComponent,
        data: { 
          title: "Ogat Store Manager » System Setup » Product Units", 
          PageTitle: "Manage Product Units", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-color-variants",
        component: ColorVariantComponent,
        data: { 
          title: "Ogat Store Manager » System Setup » Color Variants", 
          PageTitle: "Manage Color Variants", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-product-materials",
        component: ProductMaterialComponent,
        data: { 
          title: "Ogat Store Manager » System Setup » Product Material", 
          PageTitle: "Manage Product Material", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-class",
        component: ClassComponent,
        data: { 
          title: "Ogat Store Manager » System Setup » Class", 
          PageTitle: "Manage Class", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-country",
        component: CountryComponent,
        data: { 
          title: "Ogat Store Manager » System Setup » Country", 
          PageTitle: "Manage Country", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-payment-methods",
        component: PaymentMethodsComponent,
        data: { 
          title: "Ogat Store Manager » System Setup » Payment Methods", 
          PageTitle: "Manage Payment Methods", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-ways-of-delivery",
        component: WaysOfDeliveryComponent,
        data: { 
          title: "Ogat Store Manager » System Setup » Ways Of Delivery", 
          PageTitle: "Manage Ways Of Delivery", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-province",
        component: ProvinceComponent,
        data: { 
          title: "Ogat Store Manager » System Setup » Province", 
          PageTitle: "Manage Province", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-return-reasons",
        component: ReasonOfReturnOrderComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Return Reasons", 
          PageTitle: "Manage Return Reasons", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-cancel-reasons",
        component: ReasonOfCancelOrderComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Cancel Reasons", 
          PageTitle: "Manage Cancel Reasons", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      
    ]
  }
];

export const routing = RouterModule.forChild(routes);
