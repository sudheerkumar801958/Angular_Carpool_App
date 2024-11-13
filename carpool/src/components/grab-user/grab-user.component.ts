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
 availableRides:any;
  constructor(private authService:AuthService) {}

  ngOnInit(){
    this.authService.getRideDetails().subscribe (res =>{
      // console.log(res);
      this.availableRides=res
      
    })
  }

  bookSeats(ride: any) {
    const storedUser = localStorage.getItem('user');
    const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
    console.log(this.availableRides);
    console.log(ride)
    console.log(this.availableRides.selectedSeats)
    if(ride.availableSeats < ride.selectedSeats){
      alert(" Not enough seats available ")
    }
    if (loggedInUser && ride.selectedSeats) {
      const payload = {
        passanger: loggedInUser.email,
        bookedSeats: ride.selectedSeats,
        email: ride.owner,  // Additional ride details if needed
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
      console.error('User not logged in or no seats selected');
    }
  }
  

  
}