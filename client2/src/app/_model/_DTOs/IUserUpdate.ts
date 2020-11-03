import { Gender } from '../_Enum/Gender';

export class BaseUserUpdateForReturn {
  Password: string = null;
  Email: string = null;
  Gender: Gender = Gender.male;
  KnownAs: string = null;
}
export class BaseUserUpdateForEdit {
  Id: string = null;
  Password: string = null;
  Email: string = null;
  Gender: Gender = Gender.male;
  KnownAs: string = null;
  LastActive: Date = new Date(Date.now());
}
export class TrainerUpdateForReturn {
  Focus: string[] = [];
  Introduction: string = null;
}
export class TrainerUpdateForEdit {
  LastActive: Date = new Date(Date.now());
  Focus: string[] = [];
  Id: string = null;
  Introduction: string = null;
}
