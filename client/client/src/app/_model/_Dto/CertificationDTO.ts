import { _organization } from 'src/app/_data/_organizations';
import { ICertification } from '../_Interface/ICertifications';

export class CertificationDTO implements ICertification {
  title: string = 'CPT';
  created: Date = new Date();
  expired: Date = new Date();
  trainerId: string = '';
  organization: string = _organization[1].name;
  uid: string;
  neverExpire: boolean = false;
}
