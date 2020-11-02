export interface IUserForRegisterDto {
    Email: String;
    Password: String;
    Created: Date;
    LastActive: Date;
    Gender: String;
    Focus: String[];
    KnownAs: String;
    IsTrainer: boolean;
    Country: String;
    City: String;
    Province: String;
    Address: String;
    Introduction: String;
}