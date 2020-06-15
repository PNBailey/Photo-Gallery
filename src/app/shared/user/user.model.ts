import { Comment } from '../comments/comments.model';

export class User {

    constructor(
        public email: string,
        public name: string,
        public likes: string[],
        public comments: Comment[]
    ) {}

}