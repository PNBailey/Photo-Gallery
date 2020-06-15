import { Injectable } from '@angular/core';
import { UsersService } from '../shared/user/users.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Image } from '../shared/models/image.model';
import { GalleryListService } from '../gallery-list/gallery-list.service';
import { Subject } from 'rxjs';
import { User } from '../shared/user/user.model';

@Injectable({ providedIn: 'root' })

export class FavouritesService {

    filteredFavouriteImages: Image[]

    updateLikes = new Subject<Image[]>();

    constructor(private usersService: UsersService, private gallerylistService: GalleryListService, private dataStorageService: DataStorageService) { }

    filterFavouriteImages(images: Image[], users: User[], currUsersIndex: number) {

        // const currUsersIndex = this.usersService.getCurrUserArrIndex();

        const FavouritesList = users[currUsersIndex].likes;

        this.filteredFavouriteImages = images.filter(e => FavouritesList.includes(e.imagePath))

        return this.filteredFavouriteImages;

    }

    toggleLike(imageUrl: string, users: User[], currUsersIndex: number) {

        //1. get current users index in the array
        // const currUsersIndex = this.usersService.getCurrUserArrIndex();

        //2. push new like into user service users array

        if (users[currUsersIndex].likes.indexOf(imageUrl) === -1) {
            users[currUsersIndex].likes.push(imageUrl);
        } else if (users[currUsersIndex].likes.indexOf(imageUrl) !== -1) {
            const likedImageIndex = users[currUsersIndex].likes.indexOf(imageUrl);
            users[currUsersIndex].likes.splice(likedImageIndex, 1);
        }

        //3. Update users
        this.usersService.setUsers(users);

        //4. add new users array to firebase
        this.dataStorageService.addUsers();

        //5. Get Images
        const images = this.gallerylistService.getImages();

        //6. call filter method
        this.filterFavouriteImages(images, users, currUsersIndex);

        //7. emit updated likes
        this.updateLikes.next(this.filteredFavouriteImages);

    }


    checkNumLikes(imageUrl: string): number {

        const users = this.usersService.getUsers();

        const allLikes = users.map(e => {
            return e.likes;
        })
        const mergedLikes = [].concat.apply([], allLikes);

        const imageLikes = mergedLikes.filter(e => imageUrl === e);

        return imageLikes.length;
    }

}