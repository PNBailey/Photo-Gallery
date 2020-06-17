import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from "rxjs/operators"; 
import { AuthUser } from './auth-user.model';
import { UsersService } from '../shared/user/users.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../shared/user/user.model';
import { DataStorageService } from '../shared/data-storage.service';


export interface AuthResponseData { 

    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; 
}


@Injectable({providedIn: 'root'})
export class AuthService {

    
private tokenExpirationTimer: any; 

authUserSubject = new BehaviorSubject<AuthUser>(null);

constructor(
    private http: HttpClient, 
    private usersService: UsersService, 
    private router: Router,
    private dataStorageService: DataStorageService
    ) {}

returnSecureToken: true

    // Log in for log in button 

    logIn(email: string, password: string) {

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGXhYRL2Pon3byRqPaSxZPoXbrixG7qhA', {

            email: email,
            password: password,
            returnSecureToken: true

        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }));
        
    }


    // Auto log in for when the browser is refreshed when a user is already logged in

    autoLogin() {
       
        const userData = this.usersService.getCurrentUser();

        if(!userData) {
            return;
        } 

        const loadedUser = new AuthUser(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token) {
            this.authUserSubject.next(loadedUser); 
            
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); 

            this.autoLogout(expirationDuration); 

        }
        
    }

    // Log out for log out button 

    logOut() {
        this.authUserSubject.next(null);
        localStorage.removeItem('authUserData'); 
        if(this.tokenExpirationTimer) { 
            clearTimeout(this.tokenExpirationTimer);
        } 
        this.tokenExpirationTimer = null;
        this.router.navigate(['log-in']);
        sessionStorage.removeItem('favourites');
    }

    // Auto logout for when the firebase user token expires (after 1 hour)

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration)
    }

    // Register method for when the user registered

    register(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGXhYRL2Pon3byRqPaSxZPoXbrixG7qhA', {
            email: email,
            password: password,
            returnSecureToken: true

        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    changePassword(email: string) {
        return this.http.post<string>('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCGXhYRL2Pon3byRqPaSxZPoXbrixG7qhA', {
            requestType: "PASSWORD_RESET",
            email: email
        }).pipe(catchError(this.handleError));
    }


    // Outsourced error handling to seperate method to use in http requests above

    private handleError(errorRes: HttpErrorResponse) { 

        let errorMessage = 'An unknown error occured' 

        if(!errorRes.error || !errorRes.error.error) { 

            return throwError(errorMessage); 
        }
        switch(errorRes.error.error.message) { 
      
            case 'EMAIL_EXISTS': 
              errorMessage = 'This email already exists';  
              break;
            case 'EMAIL_NOT_FOUND': 
              errorMessage = 'This email does not exist';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'Invalid password';
              break;
          } 

          return throwError(errorMessage);
    }

    // outsourced authentication method to be used in above http requests 

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) { 

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); 

        const authUser = new AuthUser(email, userId, token, expirationDate); 

        this.authUserSubject.next(authUser); 

        localStorage.setItem('authUserData', JSON.stringify(authUser));

        this.autoLogout(expiresIn * 1000);
       
    }

    handleSubscriptionSuccess(mode: string, newUser: User) {
        if(mode === 'logIn') {
            this.router.navigate(['/gallery-list']);
          } else if (mode === 'forgottenPassword') {
            return true;
          } else {
            this.router.navigate(['/gallery-list']);
            this.usersService.addUser(newUser);
            this.dataStorageService.addUsers();
          }
    }

    getFormGroup(mode: string) {
        if(mode === 'logIn') {
            return new FormGroup({
                'email': new FormControl(null, [Validators.required, Validators.email]),
                'password': new FormControl(null, [Validators.required])
              })
        } else if(mode === 'forgottenPassword') {
            return new FormGroup({
                'email': new FormControl(null, [Validators.required, Validators.email])
              })
        } else {
            return new FormGroup({
                'email': new FormControl(null, [Validators.required, Validators.email]),
                'password': new FormControl(null, [Validators.required]),
                'name': new FormControl(null, [Validators.required])
              })
        }
    }

}