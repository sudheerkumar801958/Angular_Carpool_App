import { filter } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-grab-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './grab-user.component.html',
  styleUrl: './grab-user.component.scss'
})
// export class GrabUserComponent {
//   showRides = true;
//   rides = [
//     { driver: 'Alice', from: 'City A', to: 'City B', seatsAvailable: 3, selectedSeats: 1 },
//     { driver: 'Bob', from: 'City C', to: 'City D', seatsAvailable: 2, selectedSeats: 1 },
//     { driver: 'Charlie', from: 'City E', to: 'City F', seatsAvailable: 4, selectedSeats: 1 }
//     // Add more ride data as needed
//   ];

//   bookSeats(ride: any) {
//     const selectedSeats = ride.selectedSeats || 1; // Default to 1 seat if not set

//     if (selectedSeats > ride.seatsAvailable) {
//       alert('Not enough seats available');
//       return;
//     }

//     console.log(`Booking ${selectedSeats} seat(s) with driver ${ride.driver}`);
//     // Add booking logic here, such as calling a booking service

//     // Optionally, reduce seats available after booking
//     ride.seatsAvailable -= selectedSeats;
//     ride.selectedSeats = 1; // Reset selected seats to 1 after booking
//   }
// }

export class GrabUserComponent {
  showRides = true;
  availableRides: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getRideDetails().subscribe(res => {
      this.availableRides = res;
    });
  }

  bookSeats(ride: any) {
    const storedUser = localStorage.getItem('user');
    const loggedInUser = storedUser ? JSON.parse(storedUser) : null;

    if (ride.availableSeats < ride.selectedSeats) {
      alert("Not enough seats available");
      return;
    }

    if (loggedInUser && ride.selectedSeats) {
      // Find the selected ride in availableRides based on _id
      const selectedRide = this.availableRides.find((rideItem: any) => rideItem._id === ride._id);

      if (selectedRide) {
        const payload = {
          passanger: loggedInUser.email,
          contactNumber: loggedInUser.contact,
          bookedSeats: ride.selectedSeats,
          UserName: loggedInUser.username,
          email: selectedRide.owner,      // Owner's email
          ownerNumber: selectedRide.contact  // Owner's contact number
        };

        this.authService.notifyDriver(payload).subscribe(
          response => {
            console.log('Booking successful', response);
            // Additional logic after booking, e.g., confirmation message
          },
          error => {
            console.error('Error booking seats', error);
          }
        );
      } else {
        console.error('Selected ride not found in available rides');
      }
    } else {
      console.error('User not logged in or no seats selected');
    }
  }
}
