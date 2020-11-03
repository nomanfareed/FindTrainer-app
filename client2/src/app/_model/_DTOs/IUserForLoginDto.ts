export interface IUserForLoginDto {
  Email: string;
  Password: string;
}
export class UserForLoginDto implements IUserForLoginDto {
  Email: string = 'example@email.com';
  Password: string = 'Password123@';
}
