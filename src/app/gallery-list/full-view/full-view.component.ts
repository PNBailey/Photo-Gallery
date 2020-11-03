import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Image } from '../../shared/models/image.model';
import { FavouritesService } from 'src/app/favourites/favourites.service';
import { CommentsService } from '../../shared/comments/comments.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/log-in/auth.service';
import { CommentsGetSetService } from 'src/app/shared/comments/commentsGetSet.service';

@Component({
  selector: 'app-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.css']
})
export class FullViewComponent implements OnInit, OnDestroy {

  constructor(
    private favouritesService: FavouritesService, 
    private commentsService: CommentsService,
    private authservice: AuthService,
    private commentsGetSetService: CommentsGetSetService
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
    
    this.comments = this.commentsGetSetService.getAllImageComments(this.image.imagePath);

    this.commentsSub = this.commentsService.commentsUpdated.subscribe(newComment => {
      this.comments.push(newComment);
    })
    

    this.imageLikesNum(this.image);
    this.testLikeOrLikes();

    this.userSub = this.authservice.authUserSubject.subscribe(user => {
      this.isLoggedIn = !!user;
    })
  }

  closeImage() {
    this.imageClosed.emit();
  }

  imageLikesNum(image: Image) {
    this.numOfLikes = this.favouritesService.checkNumLikes(image);
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
      this.likeOrLikes = 'Like';
    } else {
      this.likeOrLikes = 'Likes';
    }
  }

  ngOnDestroy() {
    this.commentsSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
