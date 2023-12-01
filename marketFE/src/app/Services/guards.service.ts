import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).CanActivate(route, state);
};

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private loginService: LoginService, private router: Router) { }

  CanActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const currentUser = this.loginService.getCurrentUser();
    if (currentUser) {
      // check if route is restricted by role
      if (route.data && route.data["authorities"] !== sessionStorage.getItem("userRole")) {
        console.log("Accesso negato per questo ruolo");
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      // authorised so return true
      return true;
    }

    console.log("Need log in");
    // not logged in so redirect to login page with the return url{queryParams: {returnUrl: state.url}}
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}