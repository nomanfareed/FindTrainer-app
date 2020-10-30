import { SignupDTO, TrainerDTO } from '../_model/_Dto/BaseUserDTO';

export const SignupBaseToTrainer = (a: SignupDTO, uid: string) => {
  return new TrainerDTO(uid, a.role, a.gender, a.name, a.profileUrl);
};
