import { IBaseUser } from './IBaseUser';

export interface ITrainer extends IBaseUser {
  focus: string[]; // ex. Bodybuilding, weight loss and etc.
  created: Date;
  //address
  city: string;
  province: string;
  country: string;
  fullAddress: string;
  //Extra
  avgRatingScore: number;
  totalRatings: number;
}
