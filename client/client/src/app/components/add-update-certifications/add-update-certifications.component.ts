import { CurrentUserStoreDTO } from './../../_model/_Interface/IBaseUser';
import { IOrganization, _organization } from 'src/app/_data/_organizations';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { _collection_certifications } from 'src/app/_data/_collections';
import { CertificationDTO } from 'src/app/_model/_Dto/CertificationDTO';
import { CertificationService } from 'src/app/_services/certification.service';
import { GenericsServiceService } from 'src/app/_services/generics-service.service';

@Component({
  selector: 'app-add-update-certifications',
  templateUrl: './add-update-certifications.component.html',
  styleUrls: ['./add-update-certifications.component.css'],
})
export class AddUpdateCertificationsComponent {
  @Input() dataToEdit: CertificationDTO = new CertificationDTO();
  @Input() isAdd: boolean = true;
  @Input() existedData: CertificationDTO[] = [];

  @Output() updateItems = new EventEmitter();
  listOrganizations: IOrganization[] = _organization;
  certificationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private GS: GenericsServiceService,
    private toastr: ToastrService,
    private AS: AuthService
  ) {
    this.initForm();
  }

  ngOnChange(): void {
    if (this.dataToEdit) {
      this.initForm();
    }
  }
  private initForm() {
    this.certificationForm = this.fb.group({
      title: [this.dataToEdit.title, [Validators.required]],
      created: [this.dataToEdit.created, [Validators.required]],
      expired: [
        this.dataToEdit.expired,
        this.dataToEdit.neverExpire ? [] : [Validators.required],
      ],
      organization: [this.dataToEdit.organization, [Validators.required]],
      neverExpire: [this.dataToEdit.neverExpire, [Validators.required]],
    });
  }
  addCertification(): void {
    this.AS.CurrentUser$.subscribe((res: CurrentUserStoreDTO) => {
      const item = { trainerId: res.uid, ...this.certificationForm.value };
      if (this.checkIfDuplicateExists(item)) {
        this.toastr.error('Sorry! This is a duplicate certification');
      } else {
        this.GS.addDoc(item, _collection_certifications)
          .then(() => {
            this.updateItems.emit();
            this.dataToEdit = new CertificationDTO();
            this.initForm();
            this.toastr.info('Certification is added');
          })
          .catch((err) => {
            this.toastr.error(err);
          });
      }
    }).unsubscribe();
  }
  checkIfDuplicateExists(item: CertificationDTO) {
    return this.existedData.some(
      (e) => e.title === item.title && e.organization === item.organization
    );
  }
  editCertification() {
    console.log('this.certificationForm.value', this.certificationForm.value);
  }
  FormatDate(time: Date) {
    return time.getFullYear() + '-' + time.getMonth() + '-' + time.getDay();
  }
}
