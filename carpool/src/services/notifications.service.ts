import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  notifyDriver(driver: string, seats: number): Observable<any> {
    // API call to notify the driver
    const notificationData = {
      driver,
      message: `A user has booked ${seats} seat(s) in your offered ride`
    };
    return this.http.post('/api/notify-driver', notificationData);
  }
}
