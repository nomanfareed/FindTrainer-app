import { IAddressToReturnDto } from './IAddressToReturnDto';

export interface IUserForDetailedDto {
  Id: string;
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
