import { UserAuthService } from './../../services/user-auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  userRole='';

  constructor(private fb: FormBuilder, private authService:AuthService,private userAuthService: UserAuthService ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  // username = '';
  // password = '';
  // login() {
  //   this.userAuthService.data = { username: this.username, password: this.password };
  //   this.userAuthService.loginUser();
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      // Pass the form values (email and password) to UserAuthService
      const { email, password } = this.loginForm.value;
      this.userAuthService.loginUser(email, password);

      // Reset form after submission
      this.loginForm.reset();
    }
  }
}



