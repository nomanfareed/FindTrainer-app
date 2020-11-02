export interface IUserForRegisterDto {
  Email: string;
  Password: string;
  Created: Date;
  LastActive: Date;
  Gender: string;
  Focus: String[];
  KnownAs: string;
  IsTrainer: boolean;
  Country: string;
  City: string;
  Province: string;
  Address: string;
  Introduction: string;
}
