import { Injectable } from '@angular/core';
import { Room, LayoutCapacity, Layout } from './model/Room';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  rooms: Array<Room>
  users: Array<User>;
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
    user1.id=13;
    user1.name ="Mat";
    this.users.push(user1);
  }
}
