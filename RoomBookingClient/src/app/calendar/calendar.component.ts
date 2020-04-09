import { Component, OnInit } from '@angular/core';

import { formatDate } from '@angular/common';
import { Booking } from '../model/Booking';
import { DataServiceService } from '../data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  bookings: Array<Booking>;

  constructor(private dataService: DataServiceService,
              private router : Router) { }

  selectedDate = new Date()
  ngOnInit(): void {

    this.dataService.getBookings().subscribe(
      next => this.bookings = next
    );
  }

  editBooking(id : number){
      this.router.navigate(['editBooking'], {queryParams: {id}})
  }

  addBooking(){
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id : number){
    this.dataService.deleteBooking(id).subscribe();

  }

}
