import { Component, OnInit } from '@angular/core';
import { AlbumsService } from './albums.service';
import { Album } from './albums.model';
import { Router } from '@angular/router';
import { GalleryListService } from '../gallery-list/gallery-list.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums: Album[];

  constructor(private albumsService: AlbumsService, private router: Router, private galleryListService: GalleryListService) { }

  ngOnInit() {
   this.albums = this.albumsService.getAlbums();
  }
  
  onAlbumSelect(albumid: number) {
    this.router.navigate(['albums', albumid]); 
    
  
  }

}
