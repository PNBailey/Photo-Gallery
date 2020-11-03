import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './user/users.service';
import { User } from './user/user.model';
import { map, tap } from 'rxjs/operators';
import { Like } from './likes/like.model';
import { FavouritesService } from '../favourites/favourites.service';
import { FavouritesGetSetService } from '../favourites/favourites-get-set.service';

@Injectable({providedIn: 'root'})


export class DataStorageService {

    constructor(private http: HttpClient, private usersService: UsersService, private favouritesgetSetService: FavouritesGetSetService) {}

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

    addLikes(likes: Like[]) {
        return this.http.put('https://photo-gallery-dd8b6.firebaseio.com/likes.json', likes)
        
        .subscribe(() => {
        });
    }

    retrieveLikes() {
        return this.http.get<Like[]>('https://photo-gallery-dd8b6.firebaseio.com/likes.json')

        .pipe(map(likes => {
            if(likes != null && likes) {
                return likes.map(like => {

                    return like;
    
                }
            
            )} else {
                return [];
            };


        }), tap(likes => {

            this.favouritesgetSetService.setAllLikes(likes);

        }));
    }

  
}