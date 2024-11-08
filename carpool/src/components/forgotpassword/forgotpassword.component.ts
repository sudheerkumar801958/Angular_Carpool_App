import { UserAuthService } from './../../services/user-auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  loginForm: FormGroup;
  userRole='';

  constructor(private fb: FormBuilder, private authService:AuthService,
    private userAuthService: UserAuthService, private route:Router ) {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    const storedUser = localStorage.getItem('user');
    const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
  
   
      if (this.loginForm.valid) {
        // Create a copy of the form values excluding confirmPassword
        const formData = { ...this.loginForm.value };
        delete formData.confirmPassword;
        formData['email'] = loggedInUser.email;
        console.log(formData);
    
        this.authService.forgotPassword(formData)
          .subscribe(
            response => {
              console.log('Password changed successful', response);
              this.route.navigate([''])
            },
            error => {
              console.error('forgotpassword failed', error);
            }
          );
       }
    this.loginForm.reset();
    }
    
 
  }


