import { IAddressToReturnDto } from './IAddressToReturnDto';

export interface IUserForDetailedDto {
  Id: number;
  Email: string;
  Focus: string[];
  Gender: string;
  KnownAs: string;
  Created: Date;
  LastActive: Date;
  Introduction: string;
  Address: IAddressToReturnDto;
  AvgStar: number;
  TotalStars: number;
  PhotoUrl: string;
}
