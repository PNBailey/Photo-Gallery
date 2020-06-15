import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogInService } from '../log-in/log-in.service';
import { Router } from '@angular/router';
import { GalleryListService } from '../gallery-list/gallery-list.service';
import { FavouritesService } from '../favourites/favourites.service';
import { Image } from '../shared/models/image.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  isLoggedIn = false;

  constructor(private logInService: LogInService, private router: Router, private galleryListService: GalleryListService, private favouritesService: FavouritesService) { }

  ngOnInit() {
    this.userSub = this.logInService.authUserSubject.subscribe(user => {
      this.isLoggedIn = !!user;
    })

  }

  onLoginOrOut() {
    if(this.isLoggedIn) {
      this.logInService.logOut();
    } else {
      this.router.navigate(['/log-in']);
    }

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
 

}
