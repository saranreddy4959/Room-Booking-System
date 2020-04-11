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
    return this.http.put<User>(environment.restUrl+'/api/users', user);
  }

  addUser(newUser:User,password:String): Observable<User>{
    const fullUser = {id: newUser.id, name : newUser.name, password: password};
    return this.http.post<User>(environment.restUrl + '/api/users', fullUser);
  }

  private getCorrectedRoom(room : Room){
    const correctedRoom = {id : room.id, name : room.name, location : room.location, capacities : []}
    for ( const lc of room.capacities){

      let correctLayout;
      for(let member in Layout){
        if(Layout[member] === lc.layout){
          correctLayout = member;
        }
      }

      const correctedLayout = {layout : correctLayout, capacity : lc.capacity}
      correctedRoom.capacities.push(correctedLayout);
    }
    return correctedRoom;
  }

  updateRoom(room : Room) : Observable<Room>{
    
    return this.http.put<Room>(environment.restUrl + '/api/rooms', this.getCorrectedRoom(room));
  }

  addRoom(newRoom : Room) : Observable<Room>{
    return this.http.post<Room>(environment.restUrl + '/api/rooms', this.getCorrectedRoom(newRoom));
  }

  deleteRoom(id: number) : Observable<any> {
    return this.http.delete(environment.restUrl + '/api/rooms/delete/' + id);

  }

  deleteUser(id: number) : Observable<any>{
    
    return this.http.delete(environment.restUrl + '/api/users/'+id);
  }

  resetUserPassword(id : number) : Observable<any>{
    return this.http.get(environment.restUrl + '/api/users/resetPassword/'+id);
  }

  getBookings(date : string) :  Observable<Array<Booking>>{
    return this.http.get<Array<Booking>>(environment.restUrl+'/api/bookings/' +date)
      .pipe(
        map(data => {
          const bookings = new Array<Booking>();
          for(const booking of data){
            bookings.push(Booking.fromHttp(booking));
          }
          return bookings;
        })
      );
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
    return this.http.delete(environment.restUrl+'/api/bookings/' +id)
  }


  constructor(private http : HttpClient) { 

    console.log(environment.restUrl);

  }

  
}
