import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AccountService } from "../_services/account.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService:AccountService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    
    let url: string = state.url;
    return this.checkUserLogin(route, url);
  }


  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if(this.accountService.isLoggedIn()) {
      const userRole = this.accountService.getRole();

      if(route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

  
}
