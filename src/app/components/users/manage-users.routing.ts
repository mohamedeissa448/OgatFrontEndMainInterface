import { SysSetupAuthGuardService } from "./../../authentication/services/sys-setup-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageUserAuthGuardService } from '../../authentication/services/manage-user-auth-guard.service';

const routes: Routes = [
  {
    path: "users",
    children: [
      
      {
        path: "manage-users",
        component: ManageUsersComponent ,
        data: { 
          title: "Ogat Store Manager Users » Manage Users", 
          PageTitle: "Manage Users", 
          Breadcrumb: 'Users'
        },
        canActivate: [AuthGuardService,ManageUserAuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
