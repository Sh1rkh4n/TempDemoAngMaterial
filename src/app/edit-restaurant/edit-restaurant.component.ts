import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css'],
})
export class EditRestaurantComponent implements OnInit {
  @Input() starCount: number = 5;
  @Input() selectedStar: number = 0;
  @Output() onRating: EventEmitter<number> = new EventEmitter<number>();
  maxRatingArr: any = [];
  previousSelection: number = 0;

  restaurantRecords: Restaurant = {
    id: 0,
    name: '',
    owner: '',
    mobile: '',
    email: '',
    location: '',
    rating: 0,
  };

  constructor(private rs: RestaurantService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.maxRatingArr = Array.from(Array(this.starCount).keys());
    this.route.paramMap.subscribe((params) => {
      let id = Number(params.get('id'));
      this.getById(id);
    });
  }

  getById(id: number) {
    this.rs.getRestaurantsById(id).subscribe((data) => {
      this.restaurantRecords = data;
      this.selectedStar = data.rating;
      this.previousSelection = data.rating;
    });
  }

  updateRecords() {
    this.rs.updateRestaurant(this.restaurantRecords).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  HandleMouseEnter(index: number) {
    this.selectedStar = index + 1;
  }
  HandleMouseLeave() {
    if (this.previousSelection !== 0) {
      this.selectedStar = this.previousSelection;
    } else {
      this.selectedStar = 0;
    }
  }
  SetRating(index: number) {
    this.selectedStar = index + 1;
    this.previousSelection = this.selectedStar;
    this.onRating.emit(this.selectedStar + 1);
  }
}
