import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { User } from './user.model';
import { DataStorageService } from '../data-storage.service';
import { UsersService } from './users.service';

@Injectable({providedIn: 'root'})

export class userResolver implements Resolve<User[]> {

    constructor(private dataStorageService: DataStorageService, private usersService: UsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const users = this.usersService.getUsers();

        const currUser = this.usersService.getCurrentUser();

        if(users.length === 0 && currUser) {
            return this.dataStorageService.retrieveUsers();
        }


    }

}