import { _collection_messages } from './../_data/_collections';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageDTO } from './../_model/_Dto/MessageDTO';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GenericsServiceService } from './generics-service.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private AS: AuthService,
    private GS: GenericsServiceService,
    private toastr: ToastrService
  ) {}
  SendMessage(message: MessageDTO): void {
    this.AS.CurrentUser$.subscribe(
      async (res) => {
        if (!res.uid) {
          this.toastr.error('You must login to send message');
        } else {
          message.trainerId = res.browseTrainerId;
          await this.GS.addDoc(message, _collection_messages);
          this.toastr.success('Thank you for your message!');
        }
      },
      () =>
        this.toastr.error(
          'Sorry! We are unable to send this message at this time, please try again later.'
        )
    ).unsubscribe();
  }
}
