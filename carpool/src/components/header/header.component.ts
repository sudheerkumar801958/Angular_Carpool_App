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
  loggedInUser: User | null = null;

  constructor() {}

  ngOnInit(): void {
   
  }
}
