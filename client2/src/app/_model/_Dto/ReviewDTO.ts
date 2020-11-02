import { IReview } from '../_Interface/IReview';

export class ReviewDTO implements IReview {
  receiverId: string = null;
  senderId: string = null;
  stars: number = 5;
  created: Date = new Date(Date.now());
  content: string = null;
  imageUrl: string = null;
}
