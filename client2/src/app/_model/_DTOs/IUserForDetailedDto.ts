import { IAddressToReturnDto } from './IAddressToReturnDto';

export interface IUserForDetailedDto {
  Id: number;
  Email: string;
  Focus: String[];
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
