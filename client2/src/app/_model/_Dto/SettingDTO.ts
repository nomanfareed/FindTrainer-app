import { Gender } from '../_Enum/Gender';

////////////////////////////////Settings
export class UpdateAccountDTO {
  name: string;
  gender: Gender;
}
export class UploadProfileImageDTO {
  profileUrl: string;
}
export class UpdatePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export class UpdateTrainerAccountDTO {
  focus: string[];
  city: string;
  province: string;
  country: string;
  fullAddress: string;
  onlineTraining: boolean = true; //trainer offer online training or not
}
//////////////////////////////Settings
