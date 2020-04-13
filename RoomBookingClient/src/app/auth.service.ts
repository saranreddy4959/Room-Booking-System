import { Injectable, EventEmitter } from '@angular/core';
import { DataServiceService } from './data-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  jwtToken : string;


  constructor(private dataService: DataServiceService) { }


  authenticate(name : string, password: string){
    this.dataService.validateUser(name,password).subscribe(
      next => {
        //valid data
        this.jwtToken = next.result;
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      },
      error =>{
          //error handling(not valid)
          this.isAuthenticated = false;
          this.authenticationResultEvent.emit(false);
      }
    )
    
  }
}
