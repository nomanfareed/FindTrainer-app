import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { GenericsServiceService } from 'src/app/_services/generics-service.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent {
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  @Input()
  label: string;

  fileToUpload: File;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageExists: boolean = false;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imageExists = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    //convert for upload
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
    this.fileToUpload = new File([event.base64], fileBeforeCrop.name, {
      type: fileBeforeCrop.type,
    });
  }

  constructor(
    private toastR: ToastrService,
    private GS: GenericsServiceService
  ) {}
  @Output() urlSubmit = new EventEmitter();
  done() {
    //Upload my image to cloudinary
    const file_data = this.fileToUpload;
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', 'save');
    this.GS.uploadImage(data).subscribe((response) => {
      if (response) {
        console.log('response.url', response.url);
        this.urlSubmit.emit(response.url);
      }
    });
  }
  reset() {
    this.imageChangedEvent = null;
    this.croppedImage = null;
    this.imageExists = false;
    this.myInputVariable.nativeElement.value = '';
  }
  loadImageFailed() {
    this.toastR.error('Wrong file type, please use a valid image');
  }
}
