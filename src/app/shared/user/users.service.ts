import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



@Injectable({providedIn: 'root'})
export class UsersService {

    usersChanged = new Subject<User[]>();

    private users: User[] = [];
 
    getUsers() {
        return this.users.slice();
    }

    addUser(newUser: User) {
        this.users.push(newUser);
    }

    setUsers(users: User[]) {
        this.users = users;
    }

    getCurrUserArrIndex() {

        const user = this.getCurrentUser();
        
        if(user) {

            const usersEmail = user.email;

            const users = this.getUsers();
    
            const usersIndex = users.findIndex(user => user.email === usersEmail); 

            return usersIndex;

        }

        }

      getCurrentUser() {

        const userData: {
 
             email: string,
             id: string,
             _token: string,
             _tokenExpirationDate: string
     
         } = JSON.parse(localStorage.getItem('authUserData')); 
 
     return userData;
 
     }


}

