import { AuthGuardService } from "./authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

export const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    loadChildren: () =>
      import("../app/components/dashboard/dashboard.module").then(
        m => m.DashboardModule
      )
  },
  {
    path: "authentication",
    loadChildren: () =>
      import("../app/authentication/authentication.module").then(
        m => m.AuthenticationModule
      )
  },
  {
    path: "sys-setup",
    loadChildren: () =>
      import("../app/components/sys-setup/sys-setup.module").then(
        m => m.SysSetupModule
      )
  },
  {
    path: "media",
    loadChildren: () =>
      import("../app/components/media/media.module").then(
        m => m.MediaModule
      )
  },
  {
    path: "product",
    loadChildren: () =>
      import("../app/components/product/product.module").then(
        m => m.ProductModule
      )
  },
  {
    path: "supplier",
    loadChildren: () =>
      import("../app/components/supplier/supplier.module").then(
        m => m.SupplierModule
      )
  },
  {
    path: "category",
    loadChildren: () =>
      import("../app/components/category/category.module").then(
        m => m.CategoryModule
      )
  },
  {
    path: "users",
    loadChildren: () =>
      import("../app/components/users/manage-users.module").then(
        m => m.ManageUserstModule
      )
  },
  {
    path: "inventory",
    loadChildren: () =>
      import("../app/components/inventory/inventory.module").then(
        m => m.InventoryModule
      )
  },
  {
    path: "shipping-company",
    loadChildren: () =>
      import("../app/components/shipping-company/shipping-company.module").then(
        m => m.ShippingCompanyModule
      )
  },
  {
    path: "customer",
    loadChildren: () =>
      import("../app/components/customer/customer.module").then(
        m => m.CustomerModule
      )
  },{
    path: "affiliate-seller",
    loadChildren: () =>
      import("../app/components/affiliate-seller/affiliate-seller.module").then(
        m => m.AffiliateSellerModule
      )
  },
  {
    path: "orders",
    loadChildren: () =>
      import("../app/components/orders/orders.module").then(
        m => m.OrdersModule
      )
  },
  {
    path: "reports",
    loadChildren: () =>
      import("../app/components/reports/reports.module").then(
        m => m.ReportsModule
      )
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true
});
