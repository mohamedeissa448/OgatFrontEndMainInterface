import { ManageProductAuthGuardService } from "./../../authentication/services/manage-product-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageCategoryComponent } from './manage-category/manage-category.component';

const routes: Routes = [
  {
    path: "category",
    children: [
      
      {
        path: "manage-category",
        component: ManageCategoryComponent ,
        data: { 
          title: "Ogat Store Manager Category » Manage Category", 
          PageTitle: "Manage Category", 
          Breadcrumb: 'Category'
        },
        canActivate: [AuthGuardService, ManageProductAuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
