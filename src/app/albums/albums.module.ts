import { NgModule } from '@angular/core';
import { AlbumsComponent } from './albums.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [ AlbumsComponent ],
    imports: [CommonModule, RouterModule.forChild([  { path: '', component: AlbumsComponent}
])]
})

export class AlbumsModule {}