import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../shared/user/user.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  logInForm: FormGroup;
  error: string = null;
  mode: string = 'logIn';
  passwordResetEmailSent = false;

  constructor(
    private authService: AuthService, 
    ) { }

    switchMode(chosenMode: string) {
      this.mode = chosenMode;
      this.logInForm = this.authService.getFormGroup(chosenMode);
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
        authObs = this.authService.logIn(email, password);

      } else if(this.mode === 'signUp') {
        authObs = this.authService.register(email, password);

      } else if(this.mode === 'forgottenPassword') {
        authObs = this.authService.changePassword(email);

      }

        authObs.subscribe(() => {

        this.passwordResetEmailSent = this.authService.handleSubscriptionSuccess(this.mode, newUser);
      
        this.error = null;
          
        }, errorMessage => {
          this.passwordResetEmailSent = false;
          this.error = errorMessage;
        }); 
        this.logInForm.reset();

  }

}
