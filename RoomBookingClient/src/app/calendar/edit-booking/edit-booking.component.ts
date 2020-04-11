import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/model/Booking';
import { Room, Layout } from 'src/app/model/Room';
import { DataServiceService } from 'src/app/data-service.service';
import { User } from 'src/app/model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  booking : Booking;
  rooms: Array<Room>;
  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  users: Array<User>;


  dataLoaded = false;

  message = 'Please wait....'

  constructor(private dataService : DataServiceService,
              private route: ActivatedRoute,
              private router : Router ) { }

  ngOnInit(): void {
    
    
    this.rooms = this.route.snapshot.data['rooms'];
    this.users = this.route.snapshot.data['users'];
    
    const id =this.route.snapshot.queryParams['id'];
    if(id){
    this.dataService.getBooking(+id)
    .pipe(
      map(booking => {
        booking.room = this.rooms.find(room => room.id === booking.room.id);
        booking.user = this.users.find(user => user.id === booking.user.id);
        return booking;
      })
    )
    .subscribe(
      next => {
        this.booking =  next;
        this.dataLoaded = true;
        this.message = ''
      }
    );
    } else{
      this.booking = new Booking();
      this.dataLoaded = true;
      this.message = '';
    }
  }

  onSubmit(){
    if(this.booking.id != null){
    this.dataService.saveBooking(this.booking).subscribe(
      next => this.router.navigate([''])
    );
    } else {
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate(['']));
    }

  }

}
