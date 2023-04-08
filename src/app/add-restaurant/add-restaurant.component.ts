import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css'],
})
export class AddRestaurantComponent implements OnInit {
  @Input() starCount: number = 5;
  @Input() selectedStar: number = 0;

  maxRatingArr: any = [];
  previousSelection: number = 0;

  constructor() {}

  ngOnInit() {
    this.maxRatingArr = Array(this.starCount).fill(0);
  }

  handleMouseEnter(index: number) {
    this.selectedStar = index + 1;
  }
  handleMouseLeave() {}
  setRating(index: number) {}
}
