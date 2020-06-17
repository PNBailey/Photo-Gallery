import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './log-in/auth.module';
import { GalleryListModule } from './gallery-list/gallery-list.module';
import { FavouritesModule } from './favourites/favourites.module';
import { AlbumsModule } from './albums/albums.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    GalleryListModule,
    FavouritesModule,
    AlbumsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
