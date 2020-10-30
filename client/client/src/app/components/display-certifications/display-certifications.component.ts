import { CertificationDTO } from './../../_model/_Dto/CertificationDTO';
import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { _organization } from 'src/app/_data/_organizations';
import { _collection_certifications } from 'src/app/_data/_collections';
import { GenericsServiceService } from 'src/app/_services/generics-service.service';

@Component({
  selector: 'app-display-certifications',
  templateUrl: './display-certifications.component.html',
  styleUrls: ['./display-certifications.component.css'],
})
export class DisplayCertificationsComponent {
  @Output() refresh = new EventEmitter();
  @Input() canDelete: boolean = false;
  @Input() allcertifications: CertificationDTO[] = [];
  constructor(private GS: GenericsServiceService, private TS: ToastrService) {}

  getCertImage(name: string): string {
    let final = null;
    _organization.forEach((e) => {
      if (e.name === name) {
        final = e.imageUrl;
      }
    });
    return final;
  }

  deleteItem(uid: string): void {
    this.GS.deleteDoc(uid, _collection_certifications)
      .then(() => this.refresh.emit())
      .catch(() =>
        this.TS.error('Unable to delete at this time, please try again later')
      );
  }
}
