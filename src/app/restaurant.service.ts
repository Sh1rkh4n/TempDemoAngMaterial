import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  //get all records
  getAll(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('http://localhost:3000/Restaurants');
  }

  postRestaurant(payload: Restaurant): Observable<Restaurant[]> {
    return this.http.post<Restaurant[]>('http://localhost:3000/Restaurants', payload);
  }
}
