import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { GalleryListComponent } from './gallery-list.component';
import { FullViewComponent } from './full-view/full-view.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { userResolver } from '../shared/user/user-resolver.service';
import { AuthGuard } from '../log-in/auth.guard';


@NgModule({
    declarations: [
    GalleryListComponent,
    FullViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'gallery-list', component: GalleryListComponent, resolve: [userResolver]},
            { path: 'albums/:albumId', component: GalleryListComponent, resolve: [userResolver]},
            { path: 'gallery-list/favourites', component: GalleryListComponent, canActivate: [AuthGuard], resolve: [userResolver]}
        ])
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class GalleryListModule {}