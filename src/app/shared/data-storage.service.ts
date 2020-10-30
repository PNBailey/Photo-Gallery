import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './user/users.service';
import { User } from './user/user.model';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})


export class DataStorageService {

    constructor(private http: HttpClient, private usersService: UsersService) {}

    addUsers() {

        const users = this.usersService.getUsers();

        return this.http.put('https://photo-gallery-dd8b6.firebaseio.com/users.json', users)
        
        .subscribe(() => {
        });
    }

    retrieveUsers() {
        return this.http.get<User[]>('https://photo-gallery-dd8b6.firebaseio.com/users.json')

        .pipe(map(users => {

            return users.map(user => {

                return { ...user, likes: user.likes ? user.likes: [], comments: user.comments ? user.comments: [] }

            });


        }), tap(users => {

            this.usersService.setUsers(users);

        }));
    }

  
}