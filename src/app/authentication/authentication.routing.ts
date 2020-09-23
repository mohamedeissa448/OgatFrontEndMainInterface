import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { PageLoginComponent } from "./page-login/page-login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PageForbiddonErrorComponent } from "./page-forbiddon-error/page-forbiddon-error.component";
import { PageIsErrorComponent } from "./page-is-error/page-is-error.component";
import { PageTryLaterComponent } from "./page-try-later/page-try-later.component";
import { PageChangePasswordComponent } from './page-change-password/page-change-password.component';

const routes: Routes = [
  {
    path: "",
    component: AuthenticationComponent,
    children: [
      { path: "", redirectTo: "page-login", pathMatch: "full" },
      {
        path: "page-login",
        component: PageLoginComponent,
        data: { title: "Login :: Ogat Store" },
      },
      {
        path: "page-404",
        component: PageNotFoundComponent,
        data: { title: "Page-404 :: Ogat Store" }
      },
      {
        path: "page-403",
        component: PageForbiddonErrorComponent,
        data: { title: "Page-403 :: Ogat Store" }
      },
      {
        path: "page-500",
        component: PageIsErrorComponent,
        data: { title: "Page-500 :: Ogat Store" }
      },
      {
        path: "page-503",
        component: PageTryLaterComponent,
        data: { title: "Page-503 :: Ogat Store" }
      },
      {
        path: "change-password",
        component: PageChangePasswordComponent,
        data: { title: "change-password :: Ogat Store" }
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
