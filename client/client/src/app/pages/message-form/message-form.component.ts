import { MessageService } from './../../_services/message.service';
import { _collection_messages } from './../../_data/_collections';
import { MessageDTO } from '../../_model/_Dto/MessageDTO';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css'],
})
export class MessageFormComponent implements OnInit {
  messageForm: FormGroup;
  initData: MessageDTO = new MessageDTO();

  constructor(private MS: MessageService, private fb: FormBuilder) {}
  readonly emailOnly = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    const { name, message, email, phoneNumber, title } = this.initData;
    this.messageForm = this.fb.group({
      name: [name, [Validators.required]],
      title: [
        title,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      message: [
        message,
        [
          Validators.required,
          Validators.maxLength(300),
          Validators.minLength(6),
        ],
      ],
      email: [email, [Validators.pattern(this.emailOnly), Validators.required]],
      phoneNumber: [phoneNumber, [Validators.required]],
    });
  }

  submitFunc(): void {
    const data: MessageDTO = {
      ...this.initData,
      ...this.messageForm.value,
      trainerId: null,
    };
    this.MS.SendMessage(data);
  }
}
