import { Injectable } from '@angular/core';
import { Room, LayoutCapacity, Layout } from './model/Room';
import { User } from './model/User';
import { Observable, of } from 'rxjs';
import { Booking } from './model/Booking';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private rooms: Array<Room>
  private users: Array<User>;
  private bookings : Array<Booking>;

  getRooms() : Observable<Array<Room>>{
    return of(this.rooms);
  }

  getUsers() : Observable<Array<User>>{
    return of(this.users);
  }

  updateUser(user: User) : Observable<User>{
    const originalUser = this.users.find( u => u.id === user.id);
    originalUser.name = user.name;
    return of(originalUser);
  }

  addUser(newUser:User,password:String): Observable<User>{
    let id = 0;
    for(const user of this.users){
      if(user.id> id){
          id= user.id;
      }
    }
    newUser.id = id + 1;
    this.users.push(newUser);
    return of(newUser)
  }

  updateRoom(room : Room) : Observable<Room>{
    const OriginalRoom = this.rooms.find( r => r.id === room.id);
    OriginalRoom.name = room.name;
    OriginalRoom.location = room.location;
    OriginalRoom.capacities = room.capacities;
    return of(OriginalRoom);
  }

  addRoom(newRoom : Room) : Observable<Room>{
    let id =0;
    for ( const room of this.rooms){
      if(room.id > id){
        id = room.id;
      }
    }
    newRoom.id = id + 1;
    this.rooms.push(newRoom);
    return of(newRoom);
  }

  deleteRoom(id: number) : Observable<any> {
    const room = this.rooms.find( r => r.id === id);
    this.rooms.splice(this.rooms.indexOf(room), 1);
    return of(null);

  }

  deleteUser(id: number) : Observable<any>{
    const user = this.users.find( u => u.id === id);
    this.users.splice(this.users.indexOf(user), 1);
    return of(null);
  }

  resetUserPassword(id : number) : Observable<any>{
      return of(null);
  }

  getBookings(date : string) :  Observable<Array<Booking>>{
    return of(this.bookings.filter(b => b.date === date));
  }

  getBooking(id : number): Observable<Booking>{
    return of(this.bookings.find( b => b.id === id));

  }

  saveBooking(booking : Booking) : Observable<Booking>{
    const existingBooking = this.bookings.find(b => b.id === booking.id);
    existingBooking.date = booking.date;
    existingBooking.startTime = booking.startTime;
    existingBooking.endTime = booking.endTime;
    existingBooking.title = booking.title;
    existingBooking.layout = booking.layout;
    existingBooking.room = booking.room;
    existingBooking.user = booking.user;
    existingBooking.participants =  booking.participants;
    return of(existingBooking);
  }

  addBooking(newBooking: Booking) : Observable<Booking>{
    let id =0;
    for(const booking of this.bookings){
      if(booking.id > id) id = booking.id;
    }

    newBooking.id = id + 1;
    this.bookings.push(newBooking);
    return of(newBooking);
  }

  deleteBooking(id : number){
    const booking = this.bookings.find(b => b.id === id);
    this.bookings.splice(this.bookings.indexOf(booking), 1);
    return of(null);
  }
  validateUser(name: string, password:string): Observable<{result:string}>{
      return of({result:'ok'});
  }


  constructor() { 

    console.log(environment.restUrl);

    this.rooms=new Array<Room>();
    const room1 = new Room();
    room1.id =1;
    room1.name = 'First Room';
    room1.location = 'First Floor';

    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 50;


    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = 20;

    room1.capacities.push(capacity1);
    room1.capacities.push(capacity2);





    const room2 = new Room();
    room2.id =2;
    room2.name = 'Second Room';
    room2.location = 'Third Floor';

    const capacity3 = new LayoutCapacity();
    capacity3.layout = Layout.THEATER;
    capacity3.capacity = 60;

    room2.capacities.push(capacity3);

    this.rooms.push(room1);
    this.rooms.push(room2);



    this.users= new Array<User>();
    const user1 = new User();
    user1.id=1;
    user1.name ="Mat";
    this.users.push(user1);

    const user2 = new User();
    user2.id=2;
    user2.name ="Rahul";
    this.users.push(user2);


    this.bookings = new Array<Booking>();
    const booking1 = new Booking();
    booking1.id = 1;
    booking1.room = room1;
    booking1.user = user1;
    booking1.layout = Layout.THEATER;
    booking1.title = 'Example meeting';
    booking1.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    booking1.startTime = '11:30';
    booking1.endTime = '12:30';
    booking1.participants = 12;


    const booking2 = new Booking();
    booking2.id = 2;
    booking2.room = room2;
    booking2.user = user2;
    booking2.layout = Layout.USHAPE;
    booking2.title = 'Another meeting';
    booking2.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    booking2.startTime = '14:30';
    booking2.endTime = '15:00';
    booking2.participants = 5;

    this.bookings.push(booking1);
    this.bookings.push(booking2);

  }
}
