import { ManageCustomerAuthGuardService } from "./../../authentication/services/manage-customer-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';

const routes: Routes = [
  {
    path: "customer",
    children: [
      
      {
        path: "manage-customer",
        component: ManageCustomerComponent ,
        data: { 
          title: "Ogat Store Manager » Customer » Manage Customer", 
          PageTitle: "Manage Customer", 
          Breadcrumb: 'Customer'
        },
        canActivate: [AuthGuardService, ManageCustomerAuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
