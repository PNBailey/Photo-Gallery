import { Image } from '../shared/models/image.model';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { UsersService } from '../shared/user/users.service';
import { DataStorageService } from '../shared/data-storage.service';

export interface imageFullViewData {
  imageArr: Image[];
  chosenImage: Image;
}

@Injectable({providedIn: 'root'})

export class GalleryListService {

  constructor(private usersService: UsersService, private dataStorageService: DataStorageService) {}

    private images = [
        new Image('Man Praying', 1, 'Cambodia', 'Man praying to Sun', '£100', '../../assets/Images/Cambodia/Praying to the Sun.JPG', '250px', '330px', 'Landscape'),
        new Image('Dream coat', 2, 'India', 'Colourful garment made in a an old traditional textiles factory', '£100', '../../assets/Images/India/Dream Coat.JPG', '275px', '330px', 'Portrait'),
        new Image('Lunch Stop', 3, 'Laos', 'Stopped here for lunch on a long cycle ride on one of Laos 4000 islands', '£100', '../../assets/Images/Laos/Nice spot for lunch.JPG', '300px', '330px', 'Landscape'),
        new Image('Another Planet', 4, 'Laos', 'Lights and Stalagmites', '£100', '../../assets/Images/Laos/Another planet.JPG', '275px', '330px', 'Portrait'),
        new Image('Man Observing', 5, 'India', 'Man observing the Ganges', '£100', '../../assets/Images/India/Man on the Ganges.JPG', '385px', '330px', 'Portrait'),
        new Image('Cave', 6, 'Laos', 'Cave we visited in Laos which goes right beneath a mountain', '£100', '../../assets/Images/Laos/Out of this world.JPG', '250px', '330px', 'Landscape'),
        new Image('Kathmandu', 7, 'Nepal', 'Kathmandu', '£100', '../../assets/Images/Nepal/Kathmandu (landscape).JPG', '290px', '330px', 'Landscape'),
        new Image('Annupurna Circuit', 8, 'Nepal', '6 day trek we did in the Himalayas', '£100', '../../assets/Images/Nepal/Annupurna circuit.JPG', '350px', '330px', 'Portrait'),
        new Image('Nature Takes Hold', 9, 'Cambodia', 'Amazing trees which has engulfed this old ruin in Angkor Wat', '£100', '../../assets/Images/Cambodia/Nature takes hold.JPG', '250px', '330px', 'Landscape'),
        new Image('Floor Symmetry', 10, 'India', 'This is to the rear of the Taj Mahal. The Indian man in front rushing us around to get photos before the crowds arrive', '£100', '../../assets/Images/India/Floor Symmetry.JPG', '380px', '330px', 'Portrait'),
        new Image('Watering Hole', 11, 'Cambodia', 'Cows wallowing in the river, trying to cool down', '£100', '../../assets/Images/Cambodia/Watering hole.JPG', '250px', '330px', 'Landscape'),
        new Image('Laos Sunset', 12, 'Laos', 'View from our guesthouse in Laos. Just catching the last glimpse of the sun', '£100', '../../assets/Images/Laos/Laos sunset.JPG', '275px', '330px', 'Landscape'),
        new Image('Blue Lagoon', 13, 'Laos', 'Amazing blue river which acts like a water playground', '£100', '../../assets/Images/Laos/Blue lagoon.JPG', '350px', '330px', 'Portrait'),
        new Image('Shadows', 14, 'Laos', 'Another shot from the cave where the light casts bold shadows.', '£100', '../../assets/Images/Laos/Shadows.JPG', '350px', '330px', 'Portrait'),
        new Image('Greatest View In The World ', 15, 'Nepal', 'This from our guesthouse room during our Himalaya trek was voted the best hotel view in the world.', '£100', '../../assets/Images/Nepal/Greatest view in the world.JPG', '250px', '330px', 'Landscape'),
        new Image('Up On Monkey Hill', 16, 'Nepal', 'The highest point within Kathmandu city offers a great vantage point which allows you to appreciate the sheer scale of the city', '£100', '../../assets/Images/Nepal/Up on monkey hill.JPG', '300px', '330px', 'Portrait'),
        new Image('Stone Coloured By The Sun', 17, 'India', 'Sunrise was the perfect time to visit the Taj Mahal due to the fantastic sunlight which gave the marble this awesome colour', '£100', '../../assets/Images/India/Stone coloured by the sun.JPG', '320px', '330px', 'Portrait'),
        new Image('Light House On The Ganges', 18, 'India', 'Old colonial structure perched on the edge of the Ganges resembling a light house', '£100', '../../assets/Images/India/Light House on the Ganges.JPG', '370px', '330px', 'Portrait'),
        new Image('Nepalese Architecture', 19, 'Nepal', 'Typical architecture in the old city of Kathmandu', '£100', '../../assets/Images/Nepal/Nepalese Architecture.JPG', '275px', '330px', 'Landscape'),
        new Image('Walking The Plank', 20, 'Cambodia', 'Old wooden jetty on the beautiful island of Koh Rong in Cambodia', '£100', '../../assets/Images/Cambodia/Walking the plank.JPG', '370px', '330px', 'Portrait'),
        new Image('Boat On The Ganges', 21, 'India', 'Boat sits peacefully in the Ganges river', '£100', '../../assets/Images/India/Boat on the Ganges.JPG', '370px', '330px', 'Portrait'),
        new Image('Taj Mahal', 22, 'India', 'Tree provides perfect frame for the Taj Mahal', '£100', '../../assets/Images/India/Taj Mahal.JPG', '370px', '330px', 'Portrait'),
        new Image('Balloon Watchers', 23, 'Laos', 'The cows in the foreground help me with my composition!', '£100', '../../assets/Images/Laos/Balloon watchers.JPG', '370px', '330px', 'Portrait'),
    
    ]

    getImages() {
        return this.images;
    }

      getImage(id: number) {
    const image = this.images.find(
      (i) => {
        return i.id === id;
      }
    );
    return image;
  }

  randomNumber(limit: number) { 
    return Math.floor(Math.random() * limit) + 1;
  }

  generateClass(image: Image) {
    if(image.Orientation === 'Portrait') {
       return 'p1';
    } else if(image.Orientation === 'Landscape') {
        return 'l' + this.randomNumber(3);
    }
  }



 
}