import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './model/User';
import { DataServiceService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class PrefetchUsersService implements Resolve<Observable<Array<User>>> {

  constructor(private dataService: DataServiceService) { }

  resolve(){
    return this.dataService.getUsers();
  }
}
