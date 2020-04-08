import { Component, OnInit, Input } from '@angular/core';
import { Room, Layout, LayoutCapacity } from 'src/app/model/Room';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  @Input()
  room: Room;

  layouts = Object.keys(Layout);
  layoutEnum = Layout;

  roomForm = new FormGroup({
    roomName : new FormControl('roomName'),
    location : new FormControl('location')
  });

  
  constructor() { }

  ngOnInit(): void {
    this.roomForm.patchValue({
      roomName : this.room.name,
      location : this.room.location
    });

    for(const layout of this.layouts){
      this.roomForm.addControl(`layout${layout}`, new FormControl(`layout${layout}`));
    }

  }

  onSubmit(){
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.value['location'];

    this.room.capacities = new Array<LayoutCapacity>();
    for(const layout of this.layouts){
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = Layout[layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity);
    }
    console.log(this.room);
    //call a method in data service to save the room
  }

}
