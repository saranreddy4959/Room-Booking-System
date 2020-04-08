import { Injectable } from '@angular/core';
import { Room, LayoutCapacity, Layout } from './model/Room';
import { User } from './model/User';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private rooms: Array<Room>
  private users: Array<User>;

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
  constructor() { 
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
  }
}
