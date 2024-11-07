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
   userEmail:any;
   storedUser:any;
   loggedInUser:any
   loggedInEmail:any
   showCard = false;
  constructor(private eRef: ElementRef, private authService:AuthService) {

  }

  ngOnInit(): void {
    this.fetchProfileImage()
    if (typeof window !== 'undefined' && window.localStorage) {
      this.storedUser = localStorage.getItem('user');
  
      try {
        this.loggedInUser = this.storedUser ? JSON.parse(this.storedUser) : null;
        this. loggedInEmail= this.storedUser ? JSON.parse(this.storedUser) : null;
        
        if (this.loggedInUser && this.loggedInUser.username ) {
          this.userdata = this.loggedInUser.username;
          this.userEmail = this.loggedInEmail.email
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
      // Validate file type before uploading
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        console.error('Only image files are allowed!');
        return;
      }
  
      // Proceed with uploading the image
      const loggedInEmail = this.storedUser ? JSON.parse(this.storedUser) : null;
      const formData = new FormData();
      formData.append('image', file);
      formData.append('email', loggedInEmail.email);
  
      this.authService.uploadProfileImage(formData).subscribe({
        next: (response: any) => {
          this.profileImage = response.imageUrl; // Set the uploaded image URL
        },
        error: (error) => console.error('Image upload failed', error)
      });
  
      // Show preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  fetchProfileImage() {
    const storedUser = localStorage.getItem('user');
    const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
  
    if (loggedInUser && loggedInUser.email) {
      this.authService.getProfileImage(loggedInUser.email).subscribe({
        next: (response) => {
          // Create a URL for the image Blob
          const imageUrl = URL.createObjectURL(response);
          this.profileImage = imageUrl; // Set the image URL to display
        },
        error: (error) => {
          console.error('Failed to fetch profile image', error);
        }
      });
    } else {
      console.error('No logged-in user email found');
    }
  }
  
  


  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.showProfileCard && !this.eRef.nativeElement.contains(event.target)) {
      this.showProfileCard = false;  // Close the profile card if clicked outside
    }
  }
    
}
