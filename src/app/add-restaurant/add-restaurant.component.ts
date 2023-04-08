import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css'],
})
export class AddRestaurantComponent implements OnInit {
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
  constructor() {}

  ngOnInit() {
    this.maxRatingArr = Array.from(Array(this.starCount).keys());
    // this.maxRatingArr = Array(this.starCount).fill(0);
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

  // To the child component App-component for example:
  // Handle(event: number) {
  //   alert(`You rate ${event}} !`);
  // }
  // (onRating)="Handle($event)"
}
