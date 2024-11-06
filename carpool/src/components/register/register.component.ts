import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  // providers:[provideHttpClient()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient, private authService:AuthService) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      usertype:['',[Validators.required]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], 
      email: ['', [Validators.required, Validators.email]],
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
    if (this.registrationForm.valid) {
      // Create a copy of the form values excluding confirmPassword
      const formData = { ...this.registrationForm.value };
      delete formData.confirmPassword;
  
      console.log(formData);
  
      this.authService.register(formData)
        .subscribe(
          response => {
            console.log('Registration successful', response);
          },
          error => {
            console.error('Registration failed', error);
          }
        );
    }
    this.registrationForm.reset();
  }
  

}
