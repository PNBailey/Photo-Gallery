import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './user/users.service';
import { User } from './user/user.model';
import { map, tap } from 'rxjs/operators';
import { Like } from './likes/like.model';
import { FavouritesGetSetService } from '../favourites/favourites-get-set.service';
import { Comment } from 'src/app/shared/comments/comments.model'
import { CommentsGetSetService } from './comments/commentsGetSet.service';

@Injectable({providedIn: 'root'})


export class DataStorageService {

    constructor(private http: HttpClient, private usersService: UsersService, private favouritesgetSetService: FavouritesGetSetService, private commentsGetSetService: CommentsGetSetService) {}

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

    addComments(comments: Comment[]) {
        return this.http.put('https://photo-gallery-dd8b6.firebaseio.com/comments.json', comments)
        
        .subscribe(() => {
        });
    }

    retrieveComments() {
        return this.http.get<Comment[]>('https://photo-gallery-dd8b6.firebaseio.com/comments.json')

        .pipe(map(comments => {
            if(comments != null && comments) {
                return comments.map(comment => {

                    return comment;
    
                }
            
            )} else {
                return [];
            };


        }), tap(comments => {

            this.commentsGetSetService.setAllComments(comments);

        }));
    }
  
}