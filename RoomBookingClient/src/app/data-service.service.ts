import { Injectable } from '@angular/core';
import { Room, LayoutCapacity, Layout } from './model/Room';
import { map } from 'rxjs/operators';
import { User } from './model/User';
import { Observable, of } from 'rxjs';
import { Booking } from './model/Booking';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


  getRooms() : Observable<Array<Room>>{
    
    return this.http.get<Array<Room>>(environment.restUrl+ '/api/rooms')
    .pipe(
      map(data => {
        const rooms = new Array<Room>();
        for(const room of data) {
          rooms.push(Room.fromHttp(room));
        }
        return rooms;
      })
    );
    
  }

  getUsers() : Observable<Array<User>>{
    return this.http.get<Array<User>>(environment.restUrl+ '/api/users')
    .pipe(
      map(data => {
        const users = new Array<User>();
        for(const user of data) {
          users.push(User.fromHttp(user));
        }
        return users;
      })
    );
  }

  updateUser(user: User) : Observable<User>{
    return of(null);
  }

  addUser(newUser:User,password:String): Observable<User>{
    return of(null);
  }

  updateRoom(room : Room) : Observable<Room>{
    return of(null);
  }

  addRoom(newRoom : Room) : Observable<Room>{
    return of(null);
  }

  deleteRoom(id: number) : Observable<any> {
    return of(null);

  }

  deleteUser(id: number) : Observable<any>{
    
    return of(null);
  }

  resetUserPassword(id : number) : Observable<any>{
      return of(null);
  }

  getBookings(date : string) :  Observable<Array<Booking>>{
    return of(null);
  }

  getBooking(id : number): Observable<Booking>{
    return of(null);

  }

  saveBooking(booking : Booking) : Observable<Booking>{
    return of(null);
  }

  addBooking(newBooking: Booking) : Observable<Booking>{
    return of(null);

    
  }

  deleteBooking(id : number){
    return of(null);
  }


  constructor(private http : HttpClient) { 

    console.log(environment.restUrl);

  }

  getUser(id: number) : Observable<User>{
    return this.http.get<User>(environment.restUrl+ '/api/users/' + id)
    .pipe(
      map(data => {
        return User.fromHttp(data);
      })
    );
  }
}
