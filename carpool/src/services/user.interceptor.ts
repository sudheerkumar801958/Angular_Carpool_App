// role-based.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserAuthService } from './user-auth.service';

@Injectable()
export class RoleBasedInterceptor implements HttpInterceptor {

  constructor(private authService: UserAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the user role and token
    const role = this.authService.getUser();
    const token = localStorage.getItem('token');

    // Define headers based on role
    let headersConfig: any = {
      Authorization: `Bearer ${token}`
    };

    if (role === 'Admin') {
        headersConfig['X-Admin-Access'] = 'true';
    } else if (role === 'User') {
      headersConfig['X-User-Access'] = 'true';
    }

    // Clone the request and add headers
    const modifiedReq = req.clone({
      setHeaders: headersConfig
    });

    return next.handle(modifiedReq);
  }
}