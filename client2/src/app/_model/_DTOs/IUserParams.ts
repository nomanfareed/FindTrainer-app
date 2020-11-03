import { Gender } from '../_Enum/Gender';

export class IUserParams {
    Gender?: Gender;
    OrderBy: string;
    KnownAs: string;
    City: string;
    Country: string;
    Province: string;
    Focus: string;
    PageNumber = 1;
    PageSize = 100;

    constructor() {
        this.PageSize = 100;
    }
}