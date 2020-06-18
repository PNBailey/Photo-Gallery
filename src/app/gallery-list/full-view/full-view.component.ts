import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Image } from '../../shared/models/image.model';
import { FavouritesService } from 'src/app/favourites/favourites.service';
import { CommentsService } from '../../shared/comments/comments.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/log-in/auth.service';

@Component({
  selector: 'app-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.css']
})
export class FullViewComponent implements OnInit, OnDestroy {

  constructor(
    private favouritesService: FavouritesService, 
    private commentsService: CommentsService,
    private authservice: AuthService
    ) { }

  @Input() image: Image;
  @Output() imageClosed = new EventEmitter<void>();
  comments = [];
  commentsSub: Subscription;
  numOfLikes: number;
  viewingComments = false;
  likeOrLikes: string;
  userSub: Subscription;
  isLoggedIn = false;

  ngOnInit() {
    
    this.comments = this.commentsService.getImageComments(this.image.imagePath);

    this.commentsSub = this.commentsService.commentsUpdated.subscribe(newComment => {
      this.comments.push(newComment);
    })
    

    this.imageLikesNum(this.image.imagePath);
    this.testLikeOrLikes();

    this.userSub = this.authservice.authUserSubject.subscribe(user => {
      this.isLoggedIn = !!user;
    })
  }

  closeImage() {
    this.imageClosed.emit();
  }

  imageLikesNum(imageUrl: string) {
    this.numOfLikes = this.favouritesService.checkNumLikes(imageUrl);
  }

  onComment(newComment: string, imageUrl: string) {
    this.commentsService.postComment(newComment, imageUrl);
  }

  viewComments() {
      this.viewingComments = true;
  }

  closeComments() {
    this.viewingComments = false;
  }

  testLikeOrLikes() {
    if(this.numOfLikes === 1) {
      this.likeOrLikes = 'Like'
    } else {
      this.likeOrLikes = 'Likes'
    }
  }

  ngOnDestroy() {
    this.commentsSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
