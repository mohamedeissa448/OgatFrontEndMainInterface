import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ManageAssignedOrdersAuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.currentUser.User_Permissions.includes("canViewAssignedOrders")) {
      return true;
    }
    this.router.navigate(["/authentication/page-403"]);
    return false;
  }
}