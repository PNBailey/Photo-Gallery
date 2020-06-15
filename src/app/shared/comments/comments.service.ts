import { Injectable } from '@angular/core';
import { UsersService } from 'src/app/shared/user/users.service';
import { Comment } from 'src/app/shared/comments/comments.model';
import { DataStorageService } from '../data-storage.service';
import { Subject, merge } from 'rxjs';

@Injectable({providedIn: 'root'})

export class CommentsService {

    constructor(private usersService: UsersService, private dataStorageService: DataStorageService) {}

    commentsUpdated = new Subject<Comment>();

    postComment(comment: string, imageUrl: string) {
        //1. get user
        const users = this.usersService.getUsers();

        //2. get current users index
        const currUsersIndex = this.usersService.getCurrUserArrIndex();

        // get users name
        const usersName = users[currUsersIndex].name;

        // create new comment
        const newComment = new Comment(usersName, imageUrl, comment);
        
        //3. push comment to users comments array
        users[currUsersIndex].comments.push(newComment);

        //4. call set users from users service and pass in updated users array
        this.usersService.setUsers(users);

        //5. call add users method from data storage service 
        this.dataStorageService.addUsers();

        // 6. call subject to update comments
        this.commentsUpdated.next(newComment);
    }

    getImageComments(imageUrl: string) {
        const users = this.usersService.getUsers();
        const allComments = users.map(e => {
            return e.comments;
        })
        const imageCommentsarr = [].concat.apply([], allComments).filter(e => e.imageUrl === imageUrl);

        const imageComments = imageCommentsarr.map(e => {
            return {
                name: e.name,
                usersComment: e.usersComment
            };
        })
        return imageComments;
    }
}