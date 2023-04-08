import { NumberInput } from '@angular/cdk/coercion';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AddRestaurantComponent implements OnInit {
  @Input('rating') rating: number = 0;
  @Input('starCount') starCount: number = 5;
  @Output() ratingUpdated = new EventEmitter();

  ratingArr: number[] = [];
  maxRatingArr: any = [];

  @Input() selectedStar: number = 0;
  constructor() {}

  ngOnInit() {
    // for (let index = 0; index < this.starCount; index++) {
    //   this.ratingArr.push(index);
    // }

    this.maxRatingArr = Array(this.starCount).fill(0);
  }

  handleMouseEnter(index: number) {
    this.selectedStar = index + 1;
  }

  onClick(rating: number) {
    console.log(rating);
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
