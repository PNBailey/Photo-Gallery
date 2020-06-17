import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild([
        { path: '', component: AuthComponent}
    ]),

]
})

export class AuthModule {}