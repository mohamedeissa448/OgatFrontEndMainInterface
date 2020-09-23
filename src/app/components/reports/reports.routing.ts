import { SysSetupAuthGuardService } from "./../../authentication/services/sys-setup-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { StoreReportComponent } from './store-report/store-report.component';

const routes: Routes = [
  {
    path: "reports",
    children: [
      
      {
        path: "store-quantities",
        component:  StoreReportComponent,
        data: { 
          title: "Ogat Store Manager » Report » Manage Store Report", 
          PageTitle: "Manage Report", 
          Breadcrumb: 'Report'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
