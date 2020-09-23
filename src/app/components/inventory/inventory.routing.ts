import { ManageInventoryAuthGuardService } from "./../../authentication/services/manage-inventory-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { IncreaseInventoryComponent } from './increase-inventory/increase-inventory.component';
import { DecreaseInventoryComponent } from './decrease-inventory/decrease-inventory.component';
import { StoragePlacesComponent } from './storage-places/storage-places.component';
import { WarehousingComponent } from './warehousing/warehousing.component';
import { BarcodePrintComponent } from './barcode-print/barcode-print.component'
import { ManageBillComponent } from './manage-bill/manage-bill.component';
import { ManageReturnBillComponent } from './manage-return-bill/manage-return-bill.component';

const routes: Routes = [
  {
    path: "inventory",
    children: [
      
      {
        path: "increase-inventory",
        component: IncreaseInventoryComponent ,
        data: { 
          title: "Ogat Store Manager » Inventory » Increase Inventory", 
          PageTitle: "Increase Inventory", 
          Breadcrumb: 'Increase Inventory'
        },
        canActivate: [AuthGuardService, ManageInventoryAuthGuardService]
      },
      {
        path: "decrease-inventory",
        component: DecreaseInventoryComponent ,
        data: { 
          title: "Ogat Store Manager » Inventory » Decrease Inventory", 
          PageTitle: "Decrease Inventory", 
          Breadcrumb: 'Decrease Inventory'
        },
        canActivate: [AuthGuardService, ManageInventoryAuthGuardService]
      },
      {
        path: "storage-places",
        component: StoragePlacesComponent ,
        data: { 
          title: "Ogat Store Manager » Inventory » Storage Places", 
          PageTitle: "Storage Places", 
          Breadcrumb: 'Storage Places'
        },
        canActivate: [AuthGuardService, ManageInventoryAuthGuardService]
      },
      {
        path: "warehousing",
        component: WarehousingComponent ,
        data: { 
          title: "Ogat Store Manager » Inventory » Warehousing", 
          PageTitle: "Warehousing", 
          Breadcrumb: 'Warehousing'
        },
        canActivate: [AuthGuardService, ManageInventoryAuthGuardService]
      }
      ,
      {
        path: "print-barcode",
        component: BarcodePrintComponent ,
        data: { 
          title: "Ogat Store Manager » Inventory » Print Barcode", 
          PageTitle: "Print Barcode", 
          Breadcrumb: 'Print Barcode'
        },
        canActivate: [AuthGuardService, ManageInventoryAuthGuardService]
      },
      {
        path: "supplier-bills",
        component: ManageBillComponent ,
        data: { 
          title: "Ogat Store Manager » Inventory » Supplier Bills", 
          PageTitle: "Supplier Bills", 
          Breadcrumb: 'Supplier Bills'
        },
        canActivate: [AuthGuardService, ManageInventoryAuthGuardService]
      },
      {
        path: "supplier-returned-bills",
        component: ManageReturnBillComponent ,
        data: { 
          title: "Ogat Store Manager » Inventory » Supplier Return Bills", 
          PageTitle: "Supplier Return Bills", 
          Breadcrumb: 'Supplier Return Bills'
        },
        canActivate: [AuthGuardService, ManageInventoryAuthGuardService]
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
