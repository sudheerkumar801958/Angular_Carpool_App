// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: UserAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['role'];
    const token = localStorage.getItem('key'); 
    const userRole = this.authService.getUser();
   
    if (token && userRole === expectedRole) {
      return true;
    } else {
      // Redirect to an unauthorized page or login page
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }


  // canActivate(): boolean {
  //   // Check if the user is logged in by verifying the token
  //   const token = localStorage.getItem('key');  // Adjust this key as needed
  //   if (token) {
  //     return true;  // Allow access if token is present
  //   } else {
  //     // Redirect to login if not authenticated
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }
}
