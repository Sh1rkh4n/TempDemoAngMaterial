import { Component, Inject, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-rem-restaurant',
  templateUrl: './rem-restaurant.component.html',
  styleUrls: ['./rem-restaurant.component.css'],
})
export class RemRestaurantComponent implements OnInit {
  @Input() modalText: string = '';

  constructor(
    private rs: RestaurantService,
    public dialogRef: MatDialogRef<RemRestaurantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.modalText = `ID: ${this.data.id} NAME: ${this.data.name}`;
  }

  confirmDelete() {
    this.rs.deleteRestaurant(this.data.id).subscribe(() => {
      this.dialogRef.close(this.data.id);
    });
  }
}
