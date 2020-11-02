import { Gender } from '../_Enum/Gender';
import { Role } from '../_Enum/Role';
import { IBaseUser } from '../_Interface/IBaseUser';
import { ITrainer } from '../_Interface/ITrainer';

export class SignInDTO {
  email: string;
  password: string;
}
export class BaseUserDTO implements IBaseUser {
  role: Role = Role.user;
  gender: Gender;
  name: string;
  profileUrl: string = null;
  id: string;
}
export class SignupDTO extends BaseUserDTO {
  email: string;
  password: string;
}
export class TrainerDTO implements ITrainer {
  id: string;
  role: Role = Role.trainer;
  gender: Gender;
  name: string;
  profileUrl: string;
  //main
  focus: string[];
  created: Date = new Date(Date.now());
  //address
  city: string;
  province: string;
  country: string;
  fullAddress: string;
  //Extra
  avgRatingScore: number = 0;
  totalRatings: number = 0;
  onlineTraining: boolean = true;
}
