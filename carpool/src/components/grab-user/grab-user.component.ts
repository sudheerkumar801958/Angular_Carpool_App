import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-grab-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './grab-user.component.html',
  styleUrl: './grab-user.component.scss'
})
export class GrabUserComponent {
  userForm: FormGroup;
  rides: any[] = [];
  showRides: boolean = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      // Once user details are filled, fetch available rides for this user
      // this.rideService.getAvailableRides().subscribe((rides) => {
      //   this.rides = rides;
      //   this.showRides = true;
      // });
    }
  }
}
