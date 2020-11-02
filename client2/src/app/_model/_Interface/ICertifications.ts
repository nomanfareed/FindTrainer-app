export interface ICertification {
  title: string;
  created: Date;
  expired: Date;
  trainerId: string;
  organization: string;
  neverExpire: boolean;
}
