import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { DataStorageService } from '../data-storage.service';
import { Like } from './like.model';
import { FavouritesService } from 'src/app/favourites/favourites.service';
import { UsersService } from '../user/users.service';
import { FavouritesGetSetService } from 'src/app/favourites/favourites-get-set.service';

@Injectable({providedIn: 'root'})

export class likesResolver implements Resolve<Like[]> {

    constructor(private dataStorageService: DataStorageService, private favouritesService: FavouritesService, private usersService: UsersService, private favouritesgetSetService: FavouritesGetSetService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const likes = this.favouritesgetSetService.getAllLikes();

        const currUser = this.usersService.getCurrentUser();

        if(likes.length === 0 && currUser) {
            return this.dataStorageService.retrieveLikes();
        }


    }

}