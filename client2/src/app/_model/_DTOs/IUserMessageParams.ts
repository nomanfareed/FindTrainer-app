import { OrderByEnum } from '../_Enum/OrderByEnum';

export class IUserMessageParams {
    SortType: OrderByEnum;
    titleFilter: string;
    contentFilter: string;
    userNameFilter: string;
    trainerFilter: string;
    PageNumber = 1;
    PageSize = 100;

    constructor() {
        this.PageSize = 100;
    }
}
