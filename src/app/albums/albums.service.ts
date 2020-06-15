import { Album } from './albums.model';
import { Injectable } from '@angular/core';
import { Image } from '../shared/models/image.model';

@Injectable({providedIn: 'root'})
export class AlbumsService {


    private albums: Album[] = [
        new Album('Cambodia', 1, '../../assets/Images/Cambodia/Praying to the Sun.JPG'),
        new Album('India', 2, '../../assets/Images/India/Backdrop.JPG'),
        new Album('Laos', 3, '../../assets/Images/Laos/Out of this world.JPG'),
        new Album('Nepal', 4, '../../assets/Images/Nepal/Kathmandu (landscape).JPG'),
        new Album('Cambodia', 1, '../../assets/Images/Cambodia/Praying to the Sun.JPG'),
        new Album('India', 2, '../../assets/Images/India/Backdrop.JPG'),
        new Album('Laos', 3, '../../assets/Images/Laos/Out of this world.JPG'),
        new Album('Nepal', 4, '../../assets/Images/Nepal/Kathmandu (landscape).JPG')
    ]

    getAlbums() {
        return this.albums;
    }

    getAlbum(id: number) {
        const album = this.albums.find(
            (e) => {
            return e.id === id;
        }
        );
        return album;
    }

    filterAlbumImages(albumid: number, images: Image[]) {

        const selectedAlbum = this.getAlbum(albumid);

        const filterAlbumImages = images.filter(e => e.album === selectedAlbum.name);

        return filterAlbumImages;

    }
  


}