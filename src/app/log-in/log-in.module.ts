import { NgModule } from '@angular/core';
import { LogInComponent } from './log-in.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        LogInComponent
    ],
    imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild([
        { path: '', component: LogInComponent}
    ]),

]
})

export class LogInModule {}