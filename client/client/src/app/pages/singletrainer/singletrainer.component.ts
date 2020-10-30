import {
  _trainer_certification,
  _trainer_reviews,
  _trainers_route,
  _trainer_write_review,
} from './../../_data/_route';
import { ISidebarContent } from './../../_model/_Interface/ISidebar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { TrainerDTO } from 'src/app/_model/_Dto/BaseUserDTO';
import { UserService } from 'src/app/_services/user.service';
import { _trainer_send_message } from 'src/app/_data/_route';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-singletrainer',
  templateUrl: './singletrainer.component.html',
  styleUrls: ['./singletrainer.component.scss'],
})
export class SingletrainerComponent implements OnInit {
  currentTrainer: TrainerDTO = null;
  constructor(
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private userService: UserService
  ) {
    this.router.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.sideBarContent = this.sideBarContent.map((e) => {
        return { ...e, route: `${_trainers_route}/${id}/${e.route}` };
      });
      this.getTrainer(id);
    });
  }
  sideBarContent: ISidebarContent[] = [
    {
      name: 'Contact Me',
      icon: 'far fa-envelope',
      route: _trainer_send_message,
    },
    {
      name: 'Certifications',
      icon: 'far fa-id-badge',
      route: _trainer_certification,
    },
    {
      name: 'Reviews',
      icon: 'far fa-star',
      route: _trainer_reviews,
    },
    {
      name: 'Write a review',
      icon: 'fas fa-pencil-alt',
      route: _trainer_write_review,
    },
    //<i class="fas fa-pencil-alt"></i>
  ];
  ngOnInit(): void {}

  getTrainer(id: string): void {
    this.spinner.show();
    this.userService.getSingleTrainer(id).subscribe((res: TrainerDTO) => {
      if (res) {
        this.currentTrainer = res;
      }
      this.spinner.hide();
    });
  }
}
