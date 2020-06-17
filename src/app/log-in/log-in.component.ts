import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from '../shared/user/users.service';
import { LogInService } from './log-in.service';
import { User } from '../shared/user/user.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  logInForm: FormGroup;
  error: string = null;
  mode: string = 'logIn';
  passwordResetEmailSent = false;

  constructor(
    private logInService: LogInService, 
    private dataStorageService: DataStorageService
    ) { }

    switchMode(chosenMode: string) {
      this.mode = chosenMode;
      this.logInForm = this.logInService.getFormGroup(chosenMode);
      this.error = null;
      this.passwordResetEmailSent = false;
    }

  ngOnInit() {
        this.logInForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required])
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

      let authObs: Observable<any>;

      if(this.mode === 'logIn') {
        authObs = this.logInService.logIn(email, password);

      } else if(this.mode === 'signUp') {
        authObs = this.logInService.register(email, password);

      } else if(this.mode === 'forgottenPassword') {
        authObs = this.logInService.changePassword(email);

      }

        authObs.subscribe(() => {

         this.passwordResetEmailSent = this.logInService.handleSubscriptionSuccess(this.mode, newUser);

          // if(this.mode === 'logIn') {
          //   this.usersService.addUser(newUser);
          //   this.dataStorageService.addUsers();
          // } else if (this.mode === 'forgottenPassword') {
          //   this.passwordResetEmailSent = true;
          // } else {
          //   this.router.navigate(['/gallery-list']);
          // }
      
        this.error = null;
          
        }, errorMessage => {
          this.passwordResetEmailSent = false;
          this.error = errorMessage;
        }); 
        this.logInForm.reset();

  }

}
