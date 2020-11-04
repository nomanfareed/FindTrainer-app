import { Gender } from '../_model/_Enum/Gender';

export const filter_ProfileUrl_Method = (
  gender: Gender,
  profileUrl: string
) => {
  if (profileUrl) {
    return profileUrl;
  }
  return gender === Gender.male ? 'assets/male.png' : 'assets/female.png';
};
