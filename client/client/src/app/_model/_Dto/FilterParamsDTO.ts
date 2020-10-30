import { Gender } from '../_Enum/Gender';
interface IFilterParams {
  LastItem: any;
  FirstItem: any;
  //Side
  Search: string;
  City: string;
  Province: string;
  Country: string;
  OnlineTraining: OnlineTrainingOptions;
  Gender: GenderOptions;
  PageSize: number;
}
export class FilterParams implements IFilterParams {
  PageSize: number = 6;
  LastItem: any;
  FirstItem: Object[] = [];
  Province: string = '';
  Country: string = '';
  City: '';
  OnlineTraining: OnlineTrainingOptions = 2;
  Gender: GenderOptions = 2;
  Search: string = '';
}
enum OnlineTrainingOptions {
  no = 0,
  yes = 1,
  both = 2,
}
enum GenderOptions {
  female = 0,
  male = 1,
  both = 2,
}
