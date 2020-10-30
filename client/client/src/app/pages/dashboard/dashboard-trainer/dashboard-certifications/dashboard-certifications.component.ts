import { _collection_certifications } from 'src/app/_data/_collections';
import { Component } from '@angular/core';
// import {AllCertificationsDTO} from '../../../_model/_Dto/CertificationDTO';
import { _organization } from 'src/app/_data/_organizations';
import { CertificationDTO } from 'src/app/_model/_Dto/CertificationDTO';
import { CertificationService } from 'src/app/_services/certification.service';

@Component({
  selector: 'app-dashboard-certifications',
  templateUrl: './dashboard-certifications.component.html',
  styleUrls: ['./dashboard-certifications.component.css'],
})
export class DashboardCertificationsComponent {
  allcertifications: CertificationDTO[] = [];
  constructor(private CertificationS: CertificationService) {
    this.getCertifications();
  }
  getCertifications(): void {
    this.CertificationS.getCurrentTrainerCerts().subscribe((res: any) => {
      console.log('res', res);
      const data: CertificationDTO[] = res;
      console.log('data', data);
      this.allcertifications = data;
    });
  }

  ChangeItems(): void {
    this.getCertifications();
  }
}
