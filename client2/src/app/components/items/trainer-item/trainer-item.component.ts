import { IUserForListDto } from './../../../_model/_DTOs/IUserForListDto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer-item',
  templateUrl: './trainer-item.component.html',
  styleUrls: ['./trainer-item.component.css'],
})
export class TrainerItemComponent implements OnInit {
  @Input() TrainerItemData: IUserForListDto;
  constructor() {}

  ngOnInit(): void {}
}
