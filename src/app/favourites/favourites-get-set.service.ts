import { Injectable } from '@angular/core';
import { Like } from '../shared/likes/like.model';

@Injectable({ providedIn: 'root' })


export class FavouritesGetSetService {

    allLikes: Like[] = [];

    userslikes: Like[] = [];


    setAllLikes(likes: Like[]) {
        this.allLikes = likes;
    }

    setUsersLikes(likes: Like[]) {
        this.userslikes = likes;
    }
    
    getAllLikes() {
        return this.allLikes.slice();
    }

    getUsersLikes() {
        return this.userslikes.slice();
    }
}