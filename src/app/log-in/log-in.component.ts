import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from '../shared/user/users.service';
import { LogInService } from './log-in.service';
import { AuthResponseData } from './log-in.service'
import { User } from '../shared/user/user.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  logInForm: FormGroup;

  isLoginMode = true;

  error: string = null;

  constructor(
    private router: Router, 
    private usersService: UsersService, 
    private logInService: LogInService, 
    private dataStorageService: DataStorageService
    ) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode; 
  }

  ngOnInit() {
        this.logInForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'password': new FormControl(null, [Validators.required]),
          'name': new FormControl(null),
        })
    }

  onSubmit() {
    if(!this.logInForm.valid) {
      return;
    }
      const password = this.logInForm.value.password;
      const email = this.logInForm.value.email;
      const name = this.logInForm.value.name;
      const likes = [];
      const comments = [];

      const newUser = new User(email, name, likes, comments)

      let authObs: Observable<AuthResponseData>;

      if(this.isLoginMode) {
        authObs = this.logInService.logIn(email, password);

      } else {
        authObs = this.logInService.register(email, password);

      }

        authObs.subscribe(resData => {
          if(!this.isLoginMode) {
            this.usersService.addUser(newUser);
            this.dataStorageService.addUsers();
          }
      
        this.error = null;
        this.router.navigate(['/gallery-list'])
          
        }, errorMessage => {
          this.error = errorMessage;
        }); 
        this.logInForm.reset();

  }

}
