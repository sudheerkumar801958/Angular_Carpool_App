import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { GrabUserComponent } from '../components/grab-user/grab-user.component';
import { OfferRideComponent } from '../components/offer-ride/offer-ride.component';
import { RoleGuard } from '../services/route.guard';
import { HeaderComponent } from '../components/header/header.component';
export const routes: Routes = [
     { path: '', component: LoginComponent,data: { showHeader: false } },
    { path: 'signup', component: RegisterComponent,data: { showHeader: false } },
    { path: 'grab', component: GrabUserComponent, canActivate: [RoleGuard],
    data: { role: 'User',showHeader: true }  },
    { path: 'offer', component: OfferRideComponent ,canActivate: [RoleGuard],
    data: { role: 'Admin' ,showHeader: true} },
    // {path:'dashbord',component:HeaderComponent,canActivate:[RoleGuard]}

];
