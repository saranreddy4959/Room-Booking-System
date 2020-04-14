import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Room, Layout, LayoutCapacity } from 'src/app/model/Room';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from 'src/app/data-service.service';
import { Router } from '@angular/router';
import { FormResetServiceService } from 'src/app/form-reset-service.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit, OnDestroy {

  @Input()
  room: Room;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';

  layouts = Object.keys(Layout);
  layoutEnum = Layout;

  roomForm : FormGroup;

  resetEventSubscription : Subscription;

  
  constructor(private formBuilder: FormBuilder,
              private dataService: DataServiceService,
              private router: Router,
              private formResetService: FormResetServiceService,
              private authService: AuthService) { }

  ngOnInit(): void {
      this.initializedForm();
      this.resetEventSubscription = this.formResetService.resetRoomFormEvent.subscribe(
        room => {
          this.room = room;
          this.initializedForm();
        }
      )
  }

  ngOnDestroy(){
    this.resetEventSubscription.unsubscribe();
  }

  initializedForm() {

    this.roomForm = this.formBuilder.group(
      { 
    roomName : [this.room.name, Validators.required],
    location : [this.room.location, [Validators.required, Validators.minLength(2)]]}
    );
    // this.roomForm.patchValue({
    //   roomName : this.room.name,
    //   location : this.room.location
    // });

    for(const layout of this.layouts){
      const layoutCapacity = this.room.capacities.find(lc => lc.layout === Layout[layout]);
      const initialCapacity = layoutCapacity == null ? 0 : layoutCapacity.capacity;
      this.roomForm.addControl(`layout${layout}`, this.formBuilder.control(initialCapacity));
    }

  }

  onSubmit(){
    this.message = 'Saving ...'
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.value['location'];

    this.room.capacities = new Array<LayoutCapacity>();
    for(const layout of this.layouts){
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = Layout[layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity);
    }
    
    //call a method in data service to save the room
    if(this.room.id == null){
      this.dataService.addRoom(this.room).subscribe(
          next => {
            this.dataChangedEvent.emit();
            this.router.navigate(['admin','rooms'], {queryParams : {action : 'view', id : next.id}});
          },
          error => this.message = "Something went wrong, you may wish to try again "
      );
    } else{
      this.dataService.updateRoom(this.room).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin','rooms'], {queryParams : {action : 'view', id : next.id}});
      },
      error => this.message = "Something went wrong, you may wish to try again " + error.status
      );
    }
  }

}
