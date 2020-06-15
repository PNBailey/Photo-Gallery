import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogInService } from './log-in/log-in.service';
import { DataStorageService } from './shared/data-storage.service';
import { UsersService } from './shared/user/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Photo-Gallery';

  userSub: Subscription;

  constructor(
    private logInService: LogInService, 
    private dataStorageService: DataStorageService, 
    ) {}

ngOnInit() {
  this.logInService.autoLogin();
  // this.userSub = this.dataStorageService.retrieveUsers().subscribe(() => {
  // });
}

ngOnDestroy() {
this.userSub.unsubscribe();
}

}
