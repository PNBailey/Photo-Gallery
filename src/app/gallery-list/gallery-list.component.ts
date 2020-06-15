import { Component, OnInit, ChangeDetectionStrategy, OnDestroy  } from '@angular/core';
import { Image } from '../shared/models/image.model';
import { GalleryListService } from './gallery-list.service';
import { AlbumsService } from '../albums/albums.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FavouritesService } from './../favourites/favourites.service'
import { LogInService } from '../log-in/log-in.service';
import { UsersService } from '../shared/user/users.service';
import { User } from '../shared/user/user.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css'],
})

export class GalleryListComponent implements OnInit, OnDestroy {


  albumId: number;
  images: Image[] = [];
  galleryList: Image[] = [];
  isLoggedIn = false;
  userSub: Subscription;
  favouritesSub: Subscription;
  fullViewMode = false;
  className: string;
  image: Image;
  isLiked = false;
  favouriteImages: Image[];
  currUsersIndex: number;
  users: User[];

  constructor(
    private galleryListService: GalleryListService,
    private albumsService: AlbumsService,
    private favouritesService: FavouritesService,
    private router: Router,
    private route: ActivatedRoute,
    private logInService: LogInService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {

    this.images = this.galleryListService.getImages();
    this.albumId = +this.route.snapshot.paramMap.get('albumId');
    this.users = this.usersService.getUsers();
    this.currUsersIndex = this.usersService.getCurrUserArrIndex(); 


    this.userSub = this.logInService.authUserSubject.subscribe(user => {
      this.isLoggedIn = !!user;
    })    

    if (this.albumId) {

      this.galleryList = this.albumsService.filterAlbumImages(this.albumId, this.images);

    } else if (this.router.url.indexOf('/gallery-list/favourites') > -1) {

     this.galleryList = this.favouritesService.filterFavouriteImages(this.images, this.users, this.currUsersIndex);

     this.favouritesSub = this.favouritesService.updateLikes.subscribe(updatedLikes => {
        this.galleryList = updatedLikes;
      });  

    } else {

      this.galleryList = this.images;

    }
    
  }

  onImageSelected(image: Image) {
    this.fullViewMode = true;
    this.image = image;
  }

  onImageClose() {
    this.fullViewMode = false;
  }

  updateLike(imageUrl: string) {
    this.favouritesService.toggleLike(imageUrl, this.users, this.currUsersIndex);     
  }

   checkLike(imageUrl: string): boolean {
    
    if(this.isLoggedIn && this.currUsersIndex > -1) {
      const FavouritesList = this.users[this.currUsersIndex].likes;
  
      if(FavouritesList.includes(imageUrl)) {
          return true;
      } else {
          return false;
      }
  }
    }

  generatingClassName(image: Image) {
   return this.galleryListService.generateClass(image);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    if(this.favouritesSub) {
      this.favouritesSub.unsubscribe();
    }
  }

}



