import { Gender } from '../_Enum/Gender';

export interface IUserForListDto {
  Id: string;
  Gender: Gender;
  KnownAs: string;
  LastActive: Date;
  AvgStar: number;
  TotalStars: number;
  PhotoUrl: string;
  Focus: string[]; //ApplicationUserFocuses from API
  City: string;
  Province: string;
  Country: string;
}

export class UserForListDto implements IUserForListDto {
  Id: string = null;
  Gender: Gender = Gender.male;
  KnownAs: string = null;
  LastActive: Date;
  AvgStar: number;
  TotalStars: number;
  PhotoUrl: string = null;
  Focus: string[] = []; //ApplicationUserFocuses from API
  City: string = null;
  Province: string = null;
  Country: string = null;
}
