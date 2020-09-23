import { ManageProductAuthGuardService } from "./../../authentication/services/manage-product-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageProductComponent } from './manage-product/manage-product.component';

const routes: Routes = [
  {
    path: "product",
    children: [
      
      {
        path: "manage-product",
        component: ManageProductComponent ,
        data: { 
          title: "Ogat Store Manager » Product » Manage Product", 
          PageTitle: "Manage Product", 
          Breadcrumb: 'Product'
        },
        canActivate: [AuthGuardService, ManageProductAuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
