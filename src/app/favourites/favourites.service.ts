import { Injectable } from '@angular/core';
import { UsersService } from '../shared/user/users.service';
import { Image } from '../shared/models/image.model';
import { Subject } from 'rxjs';
import { Like } from '../shared/likes/like.model';
import { DataStorageService } from '../shared/data-storage.service';
import { FavouritesGetSetService } from './favourites-get-set.service';

@Injectable({ providedIn: 'root' })

export class FavouritesService {

    filteredFavouriteImages: Image[];

    updateLikes = new Subject<Like[]>();

    usersLikes: Like[] = [];


    constructor(private usersService: UsersService, private favouritesgetSetService: FavouritesGetSetService, private dataStorageService: DataStorageService) { }

    filterFavouriteImages(images: Image[]) {

        const likes = this.getUsersLikes().map(e => {
            return e.image
        });

        this.filteredFavouriteImages = images.filter(image => likes.includes(image));

        return this.filteredFavouriteImages;

    }

    toggleLike(image: Image) {

        // 1. get users email address
        const usersEmailAddress = this.usersService.getCurrentUser().email;

        //2. get all likes
        const allLikes = this.favouritesgetSetService.getAllLikes();

        //3. get index of like where email and url match
        const likeIndex = allLikes.findIndex(like => like.image.imagePath === image.imagePath && like.email === usersEmailAddress);

        // 4. Determine if image url and users email address is found in array
        if(likeIndex === -1) {

        // 5. if it isn't found in array, add like to array
        allLikes.push(new Like(image, usersEmailAddress));

        }//6. if it is found in array, splice it from the array
        else if (likeIndex != -1) {
            allLikes.splice(likeIndex, 1);
        }
        //7. call data storage method for adding likes and set the likes in our likes array
        
        this.favouritesgetSetService.setAllLikes(allLikes.slice());
        this.dataStorageService.addLikes(this.favouritesgetSetService.getAllLikes());

        //8 emit subject to display updated images
        this.usersLikes = this.getUsersLikes();
        this.updateLikes.next(this.usersLikes.slice());
    }

    getUsersLikes(): Like[] {
        const usersEmailAddress = this.usersService.getCurrentUser().email;

        const usersLikes = this.favouritesgetSetService.getAllLikes().filter(e => e.email === usersEmailAddress);

        return usersLikes;
    }


    checkNumLikes(image: Image): number {

        const allLikes = this.favouritesgetSetService.getAllLikes();
    
        const imageLikes = allLikes.filter(e => image.imagePath === e.image.imagePath);

        return imageLikes.length;
    }

    



}