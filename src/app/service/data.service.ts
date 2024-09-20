import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod'; // Corrected import for environment

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = environment.apiUrl; // Base URL for API requests

  constructor(private http: HttpClient) {}

  // GET request method
  get(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${endpoint}`); // Adjusted to use endpoint parameter
  }

  // POST request method
  post(endpoint: string, data: any, options?: { headers: HttpHeaders }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${endpoint}`, data, options);
  }

  // PUT request method
  put(endpoint: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${endpoint}`, data);
  }

  // DELETE request method
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${endpoint}`); // Adjusted to use endpoint parameter
  }
}

