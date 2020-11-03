import { Component, OnInit, ChangeDetectionStrategy, OnDestroy  } from '@angular/core';
import { Image } from '../shared/models/image.model';
import { GalleryListService } from './gallery-list.service';
import { AlbumsService } from '../albums/albums.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FavouritesService } from './../favourites/favourites.service'
import { AuthService } from '../log-in/auth.service';
import { UsersService } from '../shared/user/users.service';
import { User } from '../shared/user/user.model';
import { DataStorageService } from '../shared/data-storage.service';

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
  image: Image;
  isLiked = false;
  currUsersIndex: number;
  users: User[];

  constructor(
    private galleryListService: GalleryListService,
    private albumsService: AlbumsService,
    private favouritesService: FavouritesService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {

    this.images = this.galleryListService.getImages();
    this.albumId = +this.route.snapshot.paramMap.get('albumId');
    this.users = this.usersService.getUsers();
    this.currUsersIndex = this.usersService.getCurrUserArrIndex(); 
    
    this.userSub = this.authService.authUserSubject.subscribe(user => {
      this.isLoggedIn = !!user;
    })     

    if (this.albumId) {

      this.galleryList = this.albumsService.filterAlbumImages(this.albumId, this.images);

    } else if (this.router.url.indexOf('/gallery-list/favourites') > -1) {   
      
        this.galleryList = this.favouritesService.getUsersLikes().map(e => e.image);

        this.favouritesSub = this.favouritesService.updateLikes.subscribe(updatedLikes => {
          this.galleryList = updatedLikes.map(e => e.image);
          
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

  updateLike(image: Image) {
    this.favouritesService.toggleLike(image);     
  }

   checkLike(image: Image): boolean {
    
    if(this.isLoggedIn && this.currUsersIndex > -1) {
      
      const usersLikesImages = this.favouritesService.getUsersLikes().map(e => e.image.imagePath);
  
      if(usersLikesImages.includes(image.imagePath)) {
      
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



