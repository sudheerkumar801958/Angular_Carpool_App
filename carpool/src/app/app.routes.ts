import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { GrabUserComponent } from '../components/grab-user/grab-user.component';
import { OfferRideComponent } from '../components/offer-ride/offer-ride.component';
import { RoleGuard } from '../services/route.guard';
export const routes: Routes = [
     { path: '', component: LoginComponent },
    { path: 'signup', component: RegisterComponent },
    { path: 'grab', component: GrabUserComponent, canActivate: [RoleGuard],
    data: { role: 'User' }  },
    { path: 'offer', component: OfferRideComponent ,canActivate: [RoleGuard],
    data: { role: 'Admin' } },

];
