import { Component, Input } from '@angular/core';
import { TrainerDTO } from 'src/app/_model/_Dto/BaseUserDTO';

@Component({
  selector: 'app-trainer-item',
  templateUrl: './trainer-item.component.html',
  styleUrls: ['./trainer-item.component.css'],
})
export class TrainerItemComponent {
  @Input() currentTrainer: TrainerDTO;
}
