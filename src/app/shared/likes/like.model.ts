import { Image } from '../models/image.model';

export class Like {
    constructor(
        public image: Image,
        public email?: string
    ) {}
}