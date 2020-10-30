import { Component, OnInit } from '@angular/core';
import { CertificationDTO } from 'src/app/_model/_Dto/CertificationDTO';
import { CertificationService } from 'src/app/_services/certification.service';

@Component({
  selector: 'app-allcerts',
  templateUrl: './allcerts.component.html',
  styleUrls: ['./allcerts.component.css'],
})
export class AllcertsComponent {
  allCerts: CertificationDTO[] = [];
  constructor(private CS: CertificationService) {
    this.getCerts();
  }

  getCerts(): void {
    this.CS.getCurrentBrowseingTrainerCerts().subscribe(
      (e: CertificationDTO[]) => {
        console.log('e', e);
        this.allCerts = e || [];
      }
    );
  }
}
