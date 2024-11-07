import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-offer-ride',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './offer-ride.component.html',
  styleUrl: './offer-ride.component.scss'
})
// export class OfferRideComponent {
//   offerRideForm: FormGroup;

//   constructor(private fb: FormBuilder,private authService:AuthService) {
//     this.offerRideForm = this.fb.group({
//       origin: ['', Validators.required],
//       destination: ['', Validators.required],
//       date: ['', Validators.required],
//       availableSeats: ['', [Validators.required, Validators.min(1)]],
//       usertype: ['offer', Validators.required] // Predefined as "offer"
//     });
//   }

//   ngOnInit(): void {}

//   onSubmit() {
//     if (this.offerRideForm.valid) {
//       this.authService.register(this.offerRideForm.value)
//         .subscribe(
//           response => {
//             console.log('Registration successful', response);
//           },
//           error => {
//             console.error('Registration failed', error);
//           }
//         );
//     }
//   this.offerRideForm.reset()

//   }

// }
// export class OfferRideComponent implements OnInit {
//   offerRideForm: FormGroup;
//   // rideId: string | null = null; // Assume an identifier to track the ride
//   rideId:any;

//   constructor(private fb: FormBuilder, private authService: AuthService) {
//     this.offerRideForm = this.fb.group({
//       origin: ['', Validators.required],
//       destination: ['', Validators.required],
//       date: ['', Validators.required],
//       availableSeats: ['', [Validators.required, Validators.min(1)]],
//       usertype: ['offer', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     // Check if there is an existing ride to edit
//     this.loadRideDetails();
//   }

//   loadRideDetails() {
//     // Fetch the ride details if updating an existing ride
//     this.authService.getRideDetails(this.rideId).subscribe(rideData => {
//       this.offerRideForm.patchValue(rideData);
//     });
//   }

//   onSubmit() {
//     if (this.offerRideForm.valid) {
//       const rideData = this.offerRideForm.value;
//       if (this.rideId) {
//         // Update the ride
//         this.authService.updateRide(this.rideId, rideData).subscribe(
//           response => {
//             console.log('Ride updated successfully', response);
//           },
//           error => {
//             console.error('Update failed', error);
//           }
//         );
//       } else {
//         // Create a new ride using offerRide method
//         this.authService.offerRide(rideData).subscribe(
//           response => {
//             console.log('Ride offered successfully', response);
//             this.rideId = response.id; // Store the ID for potential updates
//           },
//           error => {
//             console.error('Offer ride failed', error);
//           }
//         );
//       }
//       this.offerRideForm.reset();
//     }
//   }
  
// }

export class OfferRideComponent implements OnInit {
  offerRideForm: FormGroup;
  rideId: any;
  isSubmitted = false;  // Flag to track if the form was submitted
  rideDetails: any = null; // Store ride details for displaying after submission
  storedUser:any
  userdata:any

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.offerRideForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      availableSeats: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadRideDetails();
    if (typeof window !== 'undefined' && window.localStorage) {
      this.storedUser = localStorage.getItem('user');
  
      try {
        const userEmail = this.storedUser ? JSON.parse(this.storedUser) : null;
        
        if (userEmail && userEmail.email) {
          this.userdata = userEmail.email;
          console.log(this.userdata);
        } else {
          console.log("No user found in localStorage.");
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.log("localStorage is not available.");
    }
  }

  loadRideDetails() {
    if (this.rideId) {
      this.authService.getRideDetails(this.rideId).subscribe(rideData => {
        this.offerRideForm.patchValue(rideData);
        this.rideDetails = rideData;
        this.isSubmitted = true;
      });
    }
  }

  onSubmit() {
    if (this.offerRideForm.valid) {
      const rideData = {
        ...this.offerRideForm.value,  // Spread the form values
        email: this.userdata           // Add userdata (email) to the payload
      };
     
        this.authService.offerRide(rideData).subscribe(
          response => {
            console.log('Ride offered successfully', response);
            this.rideId = response.id;
            this.rideDetails = rideData;
            this.isSubmitted = true;
          },
          error => {
            console.error('Offer ride failed', error);
          }
        );
      
      this.offerRideForm.reset();
    }

  }

  onEdit() {
    this.isSubmitted = false; // Show form again for editing
  }
}


// onSubmit() {
//   if (this.offerRideForm.valid) {
//     const rideData = this.offerRideForm.value;
//     if (this.rideId) {
//       this.authService.updateRide(this.rideId, rideData).subscribe(
//         response => {
//           console.log('Ride updated successfully', response);
//           this.rideDetails = rideData;
//           this.isSubmitted = true;
//         },
//         error => {
//           console.error('Update failed', error);
//         }
//       );
//     } else {
//       this.authService.offerRide(rideData).subscribe(
//         response => {
//           console.log('Ride offered successfully', response);
//           this.rideId = response.id;
//           this.rideDetails = rideData;
//           this.isSubmitted = true;
//         },
//         error => {
//           console.error('Offer ride failed', error);
//         }
//       );
//     }
//     this.offerRideForm.reset();
//   }
// }
