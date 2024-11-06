import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private userSubject = new BehaviorSubject<any>(null); // Initially no user
  user$ = this.userSubject.asObservable();
 userRole='';

  constructor(private authService:AuthService, private router: Router) { }
  loginUser(email: string, password: string) {
    console.log(email, password)
    // Prepare the login data with email and password
    const loginData = { email, password };
    
    this.authService.login(loginData).subscribe(
      response => {
        console.log('Login successful', response);
        localStorage.setItem('key', response.token);
        localStorage.setItem('role', response.usertype);
        
        const userData = {...response};
        delete userData.token
        console.log(userData)
        // this.userSubject.next(userData);
        localStorage.setItem('user', userData); 
        this.userRole = this.getUser();
        if (this.userRole === 'Admin') {
          this.router.navigate(['/offer']); // Redirect to Offer Ride page for Admins
        } else {
          this.router.navigate(['/grab']); // Redirect to Available Rides page for Users
        }
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

  getUser(){
    let role:any = localStorage.getItem('role')
    console.log(role)
    if(role === "offer"){
      return 'Admin'
    } else return 'User'
  }
}
