import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from 'src/app/model/Room';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service.service';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input()
  room : Room;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = "";

  isAdminUser = false;

  constructor(private router: Router,
              private dataService : DataServiceService,
              private authService : AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.role);
    if(this.authService.role === 'ADMIN'){
      this.isAdminUser = true;
    }
    this.authService.roleSetEvent.subscribe(
      next => {
        if(next === 'ADMIN'){
          this.isAdminUser = true;
        }
        else{
          this.isAdminUser = false;
        }
      }
    );
  }

  editRoom(){
    this.router.navigate(['admin','rooms'], {queryParams : { action: 'edit', id: this.room.id}});
  }

  deleteRoom(){

      const result = confirm('Are you sure you wish to  delete this room');
      if(result){
      this.message = 'deleting...';
      this.dataService.deleteRoom(this.room.id).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'rooms']);
        },
      error => {
        this.message = 'Sorry - this room cannot be deleted at this time.';
      }
      )
  
    }
  }

}
