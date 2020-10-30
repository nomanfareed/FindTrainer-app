import { Component, Input } from '@angular/core';
import { TrainerDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { Gender } from 'src/app/_model/_Enum/Gender';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-update-profile-image',
  templateUrl: './update-profile-image.component.html',
  styleUrls: ['./update-profile-image.component.css'],
})
export class UpdateProfileImageComponent {
  @Input() fullData: TrainerDTO;
  imageUrl: string;
  constructor(private userS: UserService) {}
  ngOnChanges() {
    this.imageInit();
  }
  imageInit() {
    if (this.fullData) {
      this.imageUrl = this.fullData.profileUrl
        ? this.fullData.profileUrl
        : this.fullData.gender === Gender.male
        ? '../../../assets/male.png'
        : '../../../assets/female.png';
    }
  }
  onChangeImage(profileUrl: string) {
    this.fullData.profileUrl = profileUrl;
    this.imageUrl = profileUrl;
    this.userS
      .EditUser(this.fullData)
      .then()
      .catch((err) => {
        console.log('err', err);
      });
  }
}
