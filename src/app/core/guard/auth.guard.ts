import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import {  CurrentPerson } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    

//     if (!this.authService.getCurrentPerson() && !this.authService.getCurrentPerson().value) {
//       this.router.navigate(['/sign-up']);
//       return false;
//     }
//     return true;
//   }
// }
   
if (this.authService.getCurrentPerson() && this.authService.getCurrentPerson().value) {
  return true;
}
else {
 this.router.navigate(['/sign-up']);
  return false;
}}
}

