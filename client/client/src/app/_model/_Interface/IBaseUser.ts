import { Gender } from '../_Enum/Gender';
import { Role } from '../_Enum/Role';

export interface IBaseUser {
  role: Role;
  gender: Gender;
  name: string;
  profileUrl: string;
}

export class CurrentUserStoreDTO {
  role: Role = null;
  uid: string = null;
  browseTrainerId: string = null;

  constructor(role: Role, currentUserId: string, browseTrainerId: string) {
    this.role = role;
    this.uid = currentUserId;
    this.browseTrainerId = browseTrainerId;
  }
}
