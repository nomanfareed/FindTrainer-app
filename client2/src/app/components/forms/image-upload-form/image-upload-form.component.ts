import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-upload-form',
  templateUrl: './image-upload-form.component.html',
  styleUrls: ['./image-upload-form.component.css'],
})
export class ImageUploadFormComponent {
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  @Input()
  label: string;
  @Output() photoSubmit = new EventEmitter();

  fileToUpload: File;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageExists: boolean = false;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imageExists = true;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    //convert for upload
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
    this.fileToUpload = new File([event.base64], fileBeforeCrop.name, {
      type: fileBeforeCrop.type,
    });
  }

  constructor(private toastR: ToastrService) {}
  done(): void {
    //Upload my image to cloudinary
    const file_data = this.fileToUpload;
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', 'save');
    this.photoSubmit.emit(data);
    this.reset();
  }
  reset(): void {
    this.imageChangedEvent = null;
    this.croppedImage = null;
    this.imageExists = false;
    this.myInputVariable.nativeElement.value = '';
  }
  loadImageFailed(): void {
    this.toastR.error('Wrong file type, please use a valid image');
  }
}
