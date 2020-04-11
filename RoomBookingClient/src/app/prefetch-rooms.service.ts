import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from './model/Room';
import { Resolve } from '@angular/router';
import { DataServiceService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class PrefetchRoomsService implements Resolve<Observable<Array<Room>>> {

  constructor(private dataService: DataServiceService) { }


  resolve(){
    return this.dataService.getRooms();
  }
}
