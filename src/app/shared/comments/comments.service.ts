import { Injectable } from '@angular/core';
import { UsersService } from 'src/app/shared/user/users.service';
import { Comment } from 'src/app/shared/comments/comments.model';
import { DataStorageService } from '../data-storage.service';
import { Subject } from 'rxjs';
import { CommentsGetSetService } from './commentsGetSet.service';

@Injectable({providedIn: 'root'})

export class CommentsService {

    constructor(private usersService: UsersService, private dataStorageService: DataStorageService, private commentsGetSetService: CommentsGetSetService) {}

    commentsUpdated = new Subject<Comment>();

    comments: Comment[] = [];
    
    postComment(comment: string, imageUrl: string) {
  
        //1. get user
        const users = this.usersService.getUsers();

        //2. get current users index
        const currUsersIndex = this.usersService.getCurrUserArrIndex();

        // 3. get users name
        const usersName = users[currUsersIndex].name;

        // 4.  create new comment
        const newComment = new Comment(usersName, imageUrl, comment);

        //5. push comment to comments array
        this.comments.push(newComment);
  
        // 6. set comments
        this.commentsGetSetService.setAllComments(this.comments.slice());

        //6. call datastorage add comments
        this.dataStorageService.addComments(this.commentsGetSetService.getAllComments());

        //7. emit subject 
        this.commentsUpdated.next(newComment);

    }
}