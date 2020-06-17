import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './log-in/auth.module';
import { GalleryListModule } from './gallery-list/gallery-list.module';
import { FavouritesModule } from './favourites/favourites.module';
import { AlbumsModule } from './albums/albums.module';
import { AuthInterceptorService } from './log-in/auth-interceptor.service';

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
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, // The first one is provide. We have to use HTTP_INTERCEPTORS type that we have to import. This just simply tells angular that all the classes within the interceptors should be treated as interceptors.
      useClass: AuthInterceptorService, // The second one is useClass. This is where we define the interceptor we want to use
      multi: true // If we have multiple interceptors we have to add this key and set it to true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
