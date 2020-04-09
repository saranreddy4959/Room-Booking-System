import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
import { Room } from 'src/app/model/Room';
import { ActivatedRoute, Router } from '@angular/router';
import { FormResetServiceService } from 'src/app/form-reset-service.service';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms : Array<Room>;
  selectedRoom: Room;
  action: String;

  constructor(private dataService: DataServiceService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService : FormResetServiceService) { }

  ngOnInit(): void {

    this.dataService.getRooms().subscribe(

      (next) => {
        this.rooms = next;
      }
    );
    this.route.queryParams.subscribe(
      (params) => {
        this.action = null;
        const id = params['id'];
        if(id){
          this.selectedRoom = this.rooms.find(room =>{
            return room.id === +id;})
          this.action = params['action'];
        }
        if(params['action']==='add'){
          this.selectedRoom = new Room();
          this.action = 'edit';
          this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
        }
      }
    )

  }

  setRoom(id : number){
    this.router.navigate(['admin','rooms'], {queryParams: {id, action : 'view'}});
  }

  addRoom(){
    this.router.navigate(['admin','rooms'], {queryParams: {action : 'add'}});

  }

}
