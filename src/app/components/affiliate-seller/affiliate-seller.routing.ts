import { ManageAffiliateSellerAuthGuardService } from "./../../authentication/services/manage-affiliate-seller-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageAffiliateSellerComponent } from './manage-affiliate-seller/manage-affiliate-seller.component';

const routes: Routes = [
  {
    path: "affiliate-seller",
    children: [
      
      {
        path: "manage-affiliate-seller",
        component: ManageAffiliateSellerComponent ,
        data: { 
          title: "Ogat Store Manager » Affiliate Seller » Manage Affiliate Seller", 
          PageTitle: "Manage Affiliate Seller", 
          Breadcrumb: 'Affiliate Seller'
        },
        canActivate: [AuthGuardService, ManageAffiliateSellerAuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
