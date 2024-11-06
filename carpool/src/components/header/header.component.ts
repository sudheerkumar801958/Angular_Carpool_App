import { Component } from '@angular/core';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   userdata:any;
  constructor() {}

  ngOnInit(): void {
   
      const storedUser = localStorage.getItem('user');
      const loggedInUser = storedUser ? JSON.parse(storedUser) : null; // Parse only if storedUser is not null
      if (loggedInUser && loggedInUser.username) {
        this.userdata = loggedInUser.username;
        console.log(this.userdata);
      } else {
        console.log("No user found in localStorage.");
      }
    }
    
}
