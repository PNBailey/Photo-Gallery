import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'gallery-list', pathMatch: 'full'},
  { path: 'log-in', loadChildren: () => import("./log-in/log-in.module").then(m => m.LogInModule)},
  { path: 'favourites', loadChildren: () => import("./favourites/favourites.module").then(m => m.FavouritesModule)},
  { path: 'albums', loadChildren: () => import("./albums/albums.module").then(m => m.AlbumsModule)}
  
] 

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
