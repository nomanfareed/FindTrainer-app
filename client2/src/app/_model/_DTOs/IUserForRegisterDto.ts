import { Gender } from '../_Enum/Gender';

export interface IUserForRegisterDto {
  Email: string;
  Password: string;
  Created: Date;
  LastActive: Date;
  Gender: Gender;
  KnownAs: string;
  IsTrainer: boolean;
}
export class UserForRegisterDto implements IUserForRegisterDto {
  Email: string = 'example@email.com';
  Password: string = 'Password123@';
  Created: Date = new Date(Date.now());
  LastActive: Date = new Date(Date.now());
  Gender: Gender = Gender.male;
  IsTrainer: boolean = true;
  KnownAs: string = 'Eric';
}
