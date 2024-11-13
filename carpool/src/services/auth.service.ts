import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://678f-45-112-28-194.ngrok-free.app/api/auth/';
  private rideUrl='https://678f-45-112-28-194.ngrok-free.app/api/rides/';
  private profileUrl='https://678f-45-112-28-194.ngrok-free.app/api/profile/';
  private grabUrl='https://678f-45-112-28-194.ngrok-free.app/api/grab/';
  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'register', userData);
  }
  login(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', userData);
  }
  forgotPassword(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'forgotpassword', userData);
  }
  offerRide(rideData: any): Observable<any> {
    return this.http.post<any>(this.rideUrl + 'create', rideData);
  }

  updateRide(rideId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}updateRide/${rideId}`, updatedData);
  }

  getRideDetails(): Observable<any> {
    return this.http.get<any>(`${this.rideUrl}getavailablerides`);
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    // const formData = new FormData();
    // formData.append('image', file);
    return this.http.post(this.profileUrl + 'uploadImage', formData);
  }

  getProfileImage(email: string): Observable<Blob> {
    return this.http.get<ArrayBuffer>(`${this.profileUrl}getprofilepic/${email}`, { responseType: 'arraybuffer' as 'json' })
      .pipe(
        map((data: ArrayBuffer) => {
          // Convert ArrayBuffer to Blob (with the appropriate mime type)
          const blob = new Blob([data], { type: 'image/jpeg' }); // Adjust mime type as needed (e.g., 'image/png')
          return blob;
        })
      );
  }

  notifyDriver(formData: any): Observable<any> {
    return this.http.post<any>(this.grabUrl + 'bookride', formData);
  }
  
  

}
