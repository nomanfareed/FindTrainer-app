import { IAddressToReturnDto } from './IAddressToReturnDto';

export interface IUserForDetailedDto {
    Id: number;
    Email: String;
    Username: String;
    Focus: String[];
    Gender: String;
    KnownAs: String;
    Created: Date;
    LastActive: Date;
    Introduction: String;
    Address: IAddressToReturnDto;
    AvgStar: number;
    TotalStars: number;
    PhotoUrl: String;
}