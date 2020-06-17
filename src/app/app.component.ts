import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './log-in/auth.service';
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
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.autoLogin();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
