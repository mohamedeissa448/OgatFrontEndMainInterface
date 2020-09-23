import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageSupplierComponent } from './manage-supplier/manage-supplier.component';
import { SupplierPaymentsComponent } from './supplier-payments/supplier-payments.component';
import { ManageSupplierAuthGuardService } from '../../authentication/services/manage-supplier-auth-guard.service';

const routes: Routes = [
  {
    path: "supplier",
    children: [
      
      {
        path: "manage-supplier",
        component: ManageSupplierComponent ,
        data: { 
          title: "Ogat Store Manager » Supplier » Manage Supplier", 
          PageTitle: "Manage Supplier", 
          Breadcrumb: 'Supplier'
        },
        canActivate: [AuthGuardService, ManageSupplierAuthGuardService]
      },
      {
        path: "supplier-payments",
        component: SupplierPaymentsComponent ,
        data: { 
          title: "Ogat Store Manager » Supplier » Manage Supplier Payments", 
          PageTitle: "Manage Supplier Payments", 
          Breadcrumb: 'Supplier'
        },
        canActivate: [AuthGuardService, ManageSupplierAuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
