import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/User';
import { DataServiceService } from 'src/app/data-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    @Input()
    user : User;

    @Output()
    dataChangedEvent = new EventEmitter();

    message = "";

    isAdminUser = false;

  constructor(private dataService:DataServiceService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
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

  editUser(){
    this.router.navigate(['admin','users'],{queryParams:{action:'edit',id:this.user.id}})
  }

  deleteUser(){
    this.message = 'deleting ...'
    this.dataService.deleteUser(this.user.id).subscribe(
      next => {
        this.dataChangedEvent.emit();
        this.router.navigate(['admin','users']);
      }, error => this.message = "Sorry, this user cannot be deleted at this time"
    );
  }

  resetPassword(){
    this.message = 'please wait...';
    this.dataService.resetUserPassword(this.user.id).subscribe(
      next => this.message = 'The password has been reset.',
      error => this.message = 'Sorry, something went wrong '
    );
  }
}
