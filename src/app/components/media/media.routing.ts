import { ManageMediaAuthGuardService } from "./../../authentication/services/manage-media-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { MediaComponent } from './media.component';

const routes: Routes = [
  {
    path: "media",
    children: [
      
      {
        path: "manage-media",
        component: MediaComponent,
        data: { 
          title: "Ogat Store Manager » Media » Manage Media", 
          PageTitle: "Manage Media", 
          Breadcrumb: 'Media'
        },
        canActivate: [AuthGuardService, ManageMediaAuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
