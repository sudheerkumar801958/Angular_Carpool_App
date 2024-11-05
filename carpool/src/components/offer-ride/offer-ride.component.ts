import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-offer-ride',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './offer-ride.component.html',
  styleUrl: './offer-ride.component.scss'
})
export class OfferRideComponent {
  offerRideForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.offerRideForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Assuming a 10-digit contact number
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      seatsAvailable: ['', [Validators.required, Validators.min(1)]],
      usertype: ['offer', Validators.required] // Predefined as "offer"
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.offerRideForm.valid) {
      console.log('Form Submitted:', this.offerRideForm.value);
      // Here you could also send the form data to your backend
    }
  }

}
