import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  private endpoint: string = 'http://localhost:3000/Restaurants';

  //get all records
  getAllRestaurant(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.endpoint);
  }

  //add new record
  newRestaurant(payload: Restaurant): Observable<Restaurant[]> {
    return this.http.post<Restaurant[]>(this.endpoint, payload);
  }

  //get records by ID
  getRestaurantsById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.endpoint}/${id}`);
  }

  //update records
  updateRestaurant(payload: Restaurant): Observable<Restaurant[]> {
    return this.http.put<Restaurant[]>(`${this.endpoint}/${payload.id}`, payload);
  }

  //delete records
  deleteRestaurant(id: number) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
