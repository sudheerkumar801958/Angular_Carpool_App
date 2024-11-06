import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8088/api/auth/';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'register', userData);
  }

  offerRide(rideData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'offerRide', rideData);
  }

  updateRide(rideId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}updateRide/${rideId}`, updatedData);
  }

  getRideDetails(rideId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}ride/${rideId}`);
  }
}
