import { Gender } from '../_Enum/Gender';

/**
 * A list of reviews that were sent from the current user.
 * Please create a route in the review controller and return a list of reviews that were sent from this current user
 * (this current user property .isTrainer must equal to false)
 */
export interface IReviewUpdateForUser {
  Content: string;
  Stars: number;
  ReceiverId: string;
  ReceiverName: string;
  ReceiverProfileUrl: string;
  Gender: Gender;
  CreatedDate: Date;
}
export class ReviewUpdateForUser implements IReviewUpdateForUser {
  Content: string = 'Good!';
  Stars: number = 5;
  ReceiverId: string = '1';
  ReceiverName: string = 'Tom';
  ReceiverProfileUrl: string = null;
  Gender: Gender = Gender.male;
  CreatedDate: Date = new Date(Date.now());
  /**
   *
   */
  constructor(name: string) {
    this.ReceiverName = name;
  }
}
/**
 * A list of reviews that were receive from the current trainer
 * Please create a route in the review controller and return a list of reviews that were receive from this current user
 * (this current user property .isTrainer must equal to true)
 */
export interface IReviewUpdateForTrainer {
  Content: string;
  Stars: number;
  SenderId: string;
  SenderName: string;
  SenderProfileUrl: string;
  CreatedDate: Date;
}

export class ReviewUpdateForTrainer implements IReviewUpdateForTrainer {
  Content: string = null;
  Stars: number = 0;
  SenderId: string = null;
  SenderName: string = null;
  SenderProfileUrl: string = null;
  CreatedDate: Date = new Date(Date.now());
}
