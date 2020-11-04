import { Gender } from '../_Enum/Gender';
import { OrderByEnum } from '../_Enum/OrderByEnum';

export class UserParams {
  Gender?: Gender = null;
  OrderBy: OrderByEnum = null;
  KnownAs: string = null;
  Locations: LocationOptions[];
  Focus: string[] = [];
  PageNumber = 1;
  PageSize = 6;
  Search: string = null;
}
export class LocationOptions {
  name: string = 'Vancouver, BC Canada'; //{{City}}, {{Province}} {{Country}}
  totalResult: number = 100; //How many trainer came from this same city, province, and country
}
