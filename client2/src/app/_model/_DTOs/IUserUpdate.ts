import { Gender } from '../_Enum/Gender';

export class BaseUserUpdateForReturn {
  Email: string = null;
  Gender: Gender = Gender.male;
  KnownAs: string = null;
}
export class TrainerUpdateForReturn {
  Focus: string[] = [];
  Introduction: string = null;
  City: string = null;
  Country: string = null;
  Province: string = null;
  FullAddress: string = null;
  OnlineTraining: boolean = false;
}
