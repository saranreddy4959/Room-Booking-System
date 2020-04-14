import { Injectable, EventEmitter } from '@angular/core';
import { DataServiceService } from './data-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  role: string;
  roleSetEvent = new EventEmitter<string>();

  constructor(private dataService:  DataServiceService) { }

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name,password).subscribe(
    next=> {
      this.setupRole();
      this.isAuthenticated = true;
      this.authenticationResultEvent.emit(true);
    },
      error =>
      {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }
    );

  }

  setupRole() {
    this.dataService.getRole().subscribe(
      next => {
        this.role = next.role;
        this.roleSetEvent.emit(next.role);
      }
    );
  }

  checkIfAlreadyAuthenticated() {
    this.dataService.getRole().subscribe(
      next => {
        if (next.role !== '') {
          this.role = next.role;
          this.roleSetEvent.emit(next.role);
          this.isAuthenticated = true;
          this.authenticationResultEvent.emit(true);
          }
      }
    );
  }

  logout() {
    this.dataService.logout().subscribe();
    this.isAuthenticated = false;
    this.authenticationResultEvent.emit(false);
  }
}


