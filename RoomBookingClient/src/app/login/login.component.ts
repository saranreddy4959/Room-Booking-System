import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  message = '';
  name : string;
  password: string;
  subscription : Subscription

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.authService.authenticationResultEvent.subscribe(
      result => {
        if(result){
          //navigation
          const url = this.activatedRouter.snapshot.queryParams['requested'];
          this.router.navigateByUrl(url);
        }
    
        else{
          this.message = 'Your username or password is incorrect. Please try again'
        }
      }
    )
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  onSubmit(){
    
    this.authService.authenticate(this.name, this.password);
  }

}
