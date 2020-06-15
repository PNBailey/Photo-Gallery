import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { User } from './user.model';
import { DataStorageService } from '../data-storage.service';
import { UsersService } from './users.service';

@Injectable({providedIn: 'root'})

export class userResolver implements Resolve<User[]> {

    constructor(private dataStorageService: DataStorageService, private usersService: UsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const users = this.usersService.getUsers();

        if(users.length === 0) {
            return this.dataStorageService.retrieveUsers();
        }


    }

}