import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RemRestaurantComponent } from '../rem-restaurant/rem-restaurant.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  // oninit
  displayedColumns: string[] = ['id', 'name', 'owner', 'mobile', 'email', 'location', 'rating', 'action'];
  dataSource = new MatTableDataSource<Restaurant>();
  allRestaurants: Restaurant[] = [];

  constructor(private restaurant: RestaurantService, public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.restaurant.getAllRestaurant().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDeleteModal(enterAnimationDuration: string, exitAnimationDuration: string, id: number, name: string): void {
    const deleteConfirmConst = this.dialog.open(RemRestaurantComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id, name },
    });

    deleteConfirmConst.afterClosed().subscribe((result) => {
      if (result) {
        this.allRestaurants = this.allRestaurants.filter((f) => f.id !== id);
      }
    });
  }
}
