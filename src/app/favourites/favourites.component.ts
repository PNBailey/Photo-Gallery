import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavouritesService } from './favourites.service';
import { GalleryListService } from '../gallery-list/gallery-list.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(private router: Router, private favouritesService: FavouritesService, private galleryListService: GalleryListService) { }

  ngOnInit() {
    this.router.navigate(['gallery-list', 'favourites']);
  }

}
