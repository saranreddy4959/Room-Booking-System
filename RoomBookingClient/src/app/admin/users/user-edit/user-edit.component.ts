import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/User';
import { DataServiceService } from 'src/app/data-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { FormResetServiceService } from 'src/app/form-reset-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  @Input()
  user : User;

  @Output()
  dataChangedEvent = new EventEmitter();

  formUser : User;

  message: string;

  password: string;
  password2: string;

  nameIsValid = false;
  passwordsAreValid = false;
  passwordsMatch = false;

  userResetSubscription : Subscription;

  constructor(private dataService : DataServiceService, private router:Router, private formResetService: FormResetServiceService) { }

  ngOnInit(): void {
    this.initializedForm();
    this.userResetSubscription = this.formResetService.resetUserFormEvent.subscribe(
      user => {
        this.user = user;
        this.initializedForm();
      }
    );
  }

  ngOnDestroy(){
    this.userResetSubscription.unsubscribe();
  }
  initializedForm(){
    this.formUser = Object.assign({},this.user);
    
    this.checkIfPasswordsArdValid();
    this.checkIfNameIsValid();
  }

  onSubmit(){
    this.message = "saving....";
    if(this.formUser.id == null){
      //add user
      this.dataService.addUser(this.formUser, this.password).subscribe(
        (user) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin','users'],{queryParams: {action:'view', id:user.id}});
        }
      );

    }else {
    this.dataService.updateUser(this.formUser).subscribe(
    (user) => {
        this.dataChangedEvent.emit();
        this.router.navigate(['admin','users'],{queryParams: {action:'view', id:user.id}});
    },
    error => this.message = "Something went wrong and the data wasn't saved . You may want to try again"
   );
  }
}

checkIfNameIsValid(){
  if(this.formUser.name){
  this.nameIsValid = this.formUser.name.trim().length > 0;
  }
  else{
    this.nameIsValid = false;
  }
}

checkIfPasswordsArdValid(){
  if(this.formUser.id != null){
    this.passwordsAreValid = true;
    this.passwordsMatch = true;   
  }else{
  this.passwordsMatch = this.password === this.password2;
  if(this.password ){
  this.passwordsAreValid = this.password.trim().length>0;
  }
  else{
    this.passwordsAreValid = false;
  }
}
}
}
