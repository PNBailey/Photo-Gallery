import { NgModule } from '@angular/core';
import { FavouritesComponent } from './favourites.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../log-in/auth.guard';


@NgModule({
    declarations: [ FavouritesComponent ],
    imports: [CommonModule, RouterModule.forChild([{ path: '', component: FavouritesComponent, canActivate: [AuthGuard]}])]
})

export class FavouritesModule {}