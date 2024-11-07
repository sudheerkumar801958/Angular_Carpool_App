import { AuthService } from './../../services/auth.service';
import { Component, ElementRef, HostListener } from '@angular/core';
import { User } from '../../model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   userdata:any;
   storedUser:any;
   showCard = false;
  constructor(private eRef: ElementRef, private authService:AuthService) {

  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.storedUser = localStorage.getItem('user');
  
      try {
        const loggedInUser = this.storedUser ? JSON.parse(this.storedUser) : null;
        
        if (loggedInUser && loggedInUser.username) {
          this.userdata = loggedInUser.username;
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
  
  showProfileCard = false; // Toggle for showing/hiding profile card
  userdata1= 'Sudheer Kumar Reddy Koduru'; // Example user data
  profileImage: string | null = null;

  toggleProfileCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  onProfileImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.authService.uploadProfileImage(file).subscribe({
        next: (response: any) => {
          this.profileImage = response.imageUrl; // Set the uploaded image URL
        },
        error: (error) => console.error('Image upload failed', error)
      });
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result; // Set the uploaded image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  }

  fetchProfileImage() {
    this.authService.getProfileImage().subscribe({
      next: (imageUrl: string) => {
        this.profileImage = imageUrl;
      },
      error: (error) => console.error('Failed to fetch profile image', error)
    });
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.showProfileCard && !this.eRef.nativeElement.contains(event.target)) {
      this.showProfileCard = false;  // Close the profile card if clicked outside
    }
  }
    
}
