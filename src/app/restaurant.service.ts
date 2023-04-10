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
  getAllRestaurant(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('http://localhost:3000/Restaurants');
  }

  //add new record
  newRestaurant(payload: Restaurant): Observable<Restaurant[]> {
    return this.http.post<Restaurant[]>('http://localhost:3000/Restaurants', payload);
  }

  //get records by ID
  getRestaurantsById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`http://localhost:3000/Restaurants/${id}`);
  }

  //update records
  updateRestaurant(payload: Restaurant): Observable<Restaurant[]> {
    return this.http.put<Restaurant[]>(`http://localhost:3000/Restaurants/${payload.id}`, payload);
  }

  //delete records
  deleteRestaurant(id: number) {
    return this.http.delete(`http://localhost:3000/Restaurants/${id}`);
  }
}
