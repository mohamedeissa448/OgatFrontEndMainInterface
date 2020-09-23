import { ManageOrdersAuthGuardService } from "./../../authentication/services/manage-orders-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AssignedOrdersComponent } from './assigned-orders/assigned-orders.component';
import { ShippedOrdersComponent } from './shipped-orders/shipped-orders.component';
import { ManageMyOrdersAuthGuardService } from "./../../authentication/services/manage-my-orders-auth-guard.service";
import { ManageAssignedOrdersAuthGuardService } from "./../../authentication/services/manage-assigned-orders-auth-guard.service";
import { ManageMyShippedOrdersAuthGuardService } from "./../../authentication/services/manage-my-shipped-orders-auth-guard.service";
import { CancelledOrdersComponent } from './cancelled-orders/cancelled-orders.component';
import {ManageCancelledOrdersAuthGuardService}  from "./../../authentication/services/manage-cancelled-orders-auth-guard.service";
import { CanReturnOrderAuthGuardService } from './../../authentication/services/can-return-order-auth-guard.service';
import { ManageReturnOrderComponent } from './manage-return-order/manage-return-order.component';
import { ManageDistributeOrdersComponent } from './manage-distribute-orders/manage-distribute-orders.component';
import { ManageCollectOrdersComponent } from './manage-collect-orders/manage-collect-orders.component';

const routes: Routes = [
  {
    path: "orders",
    children: [
      {
        path: "manage-orders",
        component: ManageOrdersComponent ,
        data: { 
          title: "Ogat Store Manager » Orders » Manage Orders", 
          PageTitle: "Manage Orders", 
          Breadcrumb: 'Orders'
        },
        canActivate: [AuthGuardService, ManageOrdersAuthGuardService]
      },
      {
        path: "my-orders",
        component:  MyOrdersComponent,
        data: { 
          title: "Ogat Store Manager » Orders » My Orders", 
          PageTitle: "My Orders", 
          Breadcrumb: 'My Orders'
        },
        canActivate: [AuthGuardService, ManageOrdersAuthGuardService , ManageMyOrdersAuthGuardService]
      },
      {
        path: "manage-return-order",
        component:  ManageReturnOrderComponent,
        data: { 
          title: "Ogat Store Manager » Orders » Return Order", 
          PageTitle: "Return Order", 
          Breadcrumb: 'Return Order'
        },
        canActivate: [AuthGuardService, ManageOrdersAuthGuardService , CanReturnOrderAuthGuardService]
      },
      {
        path: "manage-collect-orders",
        component:  ManageCollectOrdersComponent,
        data: { 
          title: "Ogat Store Manager » Orders » Collect Order", 
          PageTitle: "Collect Order", 
          Breadcrumb: 'Collect Order'
        },
        canActivate: [AuthGuardService, ManageOrdersAuthGuardService ]
      },
      {
        path: "assigned-orders",
        component:  AssignedOrdersComponent,
        data: { 
          title: "Ogat Store Manager » Orders » Assigned Orders", 
          PageTitle: "Assigned Orders", 
          Breadcrumb: 'Assigned Orders'
        },
        canActivate: [AuthGuardService, ManageOrdersAuthGuardService , ManageAssignedOrdersAuthGuardService]
      },
      {
        path: "cancelled-orders",
        component:  CancelledOrdersComponent,
        data: { 
          title: "Ogat Store Manager » Orders » Cancelled Orders", 
          PageTitle: "Cancelled Orders", 
          Breadcrumb: 'Cancelled Orders'
        },
        canActivate: [AuthGuardService, ManageOrdersAuthGuardService , ManageCancelledOrdersAuthGuardService]
      },
      {
        path: "distribute-orders",
        component:  ManageDistributeOrdersComponent,
        data: { 
          title: "Ogat Store Manager » Orders » Distribute Orders", 
          PageTitle: "Distribute Orders", 
          Breadcrumb: 'Distribute Orders'
        },
        canActivate: [AuthGuardService, ManageOrdersAuthGuardService ]
      },
      {
        path: "user-shipped-orders",
        component:  ShippedOrdersComponent,
        data: { 
          title: "Ogat Store Manager » Orders » My Shipped Orders", 
          PageTitle: "My Shipped Orders", 
          Breadcrumb: 'My Shipped Orders'
        },
        canActivate: [AuthGuardService, ManageOrdersAuthGuardService , ManageMyShippedOrdersAuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
