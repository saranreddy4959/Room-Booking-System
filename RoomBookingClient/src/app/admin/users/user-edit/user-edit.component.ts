import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/User';
import { DataServiceService } from 'src/app/data-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  user : User;

  formUser : User;

  message: string;

  password: string;
  password2: string;

  nameIsValid = false;
  passwordsAreValid = false;
  passwordsMatch = false;

  constructor(private dataService : DataServiceService, private router:Router) { }

  ngOnInit(): void {
    this.formUser = Object.assign({},this.user);
    
    this.checkIfPasswordsArdValid();
    this.checkIfNameIsValid();
  }

  onSubmit(){
    if(this.formUser.id == null){
      //add user
      this.dataService.addUser(this.formUser, this.password).subscribe(
        (user) => {
          this.router.navigate(['admin','users'],{queryParams: {action:'view', id:user.id}});
        }
      );

    }else {
    this.dataService.updateUser(this.formUser).subscribe(
    (user) => {
        this.router.navigate(['admin','users'],{queryParams: {action:'view', id:user.id}});
    }
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
  this.passwordsAreValid = this.password.trim.length>0;
  }
  else{
    this.passwordsAreValid = false;
  }
}
}
}
