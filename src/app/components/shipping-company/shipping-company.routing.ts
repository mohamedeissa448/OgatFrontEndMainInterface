import { ManageShippingCompanyAuthGuardService } from "./../../authentication/services/manage-shipping-company-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageShippingCompanyComponent } from './manage-shipping-company/manage-shipping-company.component';

const routes: Routes = [
  {
    path: "shipping-company",
    children: [
      
      {
        path: "manage-shipping-company",
        component: ManageShippingCompanyComponent ,
        data: { 
          title: "Ogat Store Manager » Shipping Company » Manage Shipping Company", 
          PageTitle: "Manage Shipping Company", 
          Breadcrumb: 'Shipping Company'
        },
        canActivate: [AuthGuardService, ManageShippingCompanyAuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
