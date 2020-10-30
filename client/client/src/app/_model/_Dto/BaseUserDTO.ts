import { Gender } from '../_Enum/Gender';
import { Role } from '../_Enum/Role';
import { ITrainer } from '../_Interface/ITrainer';
import { IBaseUser } from './../_Interface/IBaseUser';

export class SignInDTO {
  email: string;
  password: string;
}
export class BaseUserDTO implements IBaseUser {
  role: Role = Role.user;
  gender: Gender;
  name: string;
  profileUrl: string = null;
  uid: string;
}
export class SignupDTO extends BaseUserDTO {
  email: string;
  password: string;
}
export class TrainerDTO implements ITrainer {
  uid: string;
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
  constructor(
    uid: string,
    role: Role,
    gender: Gender,
    name: string,
    profileUrl: string
  ) {
    this.uid = uid;
    this.gender = gender;
    this.name = name;
    this.profileUrl = profileUrl;
    this.city = null;
    this.province = null;
    this.country = null;
    this.fullAddress = null;
    this.role = role;
    this.focus = [];
  }
}
