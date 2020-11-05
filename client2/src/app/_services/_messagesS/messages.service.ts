import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _api_DeleteMessages, _api_getCurrentTrainerMessages, _api_getCurrentUserMessages, _api_getTrainerMessages, _api_messagesLastWeek, _api_sendMessage } from 'src/app/_data/_apiRoute';
import { IUserMessageCreationDto } from 'src/app/_model/_DTOs/IUserMessageCreationDto';
import { IUserMessageParams } from 'src/app/_model/_DTOs/IUserMessageParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendMessage(model: IUserMessageCreationDto) {
    return this.http.post(this.baseUrl + _api_sendMessage, model);
  }

  getCurrentTrainerMessages(model: IUserMessageParams) {
    const params = new HttpParams()
                  .set('sortType', model.SortType.toString())
                  .set('titleFilter', model.titleFilter)
                  .set('contentFilter', model.contentFilter)
                  .set('trainerFilter', model.trainerFilter)
                  .set('PageSize', model.PageSize.toString())
                  .set('PageNumber', model.PageNumber.toString());

    return this.http.get(this.baseUrl + _api_getCurrentTrainerMessages, {params});
  }

  getCurrentUserMessages(model: IUserMessageParams) {
    const params = new HttpParams()
                  .set('sortType', model.SortType.toString())
                  .set('titleFilter', model.titleFilter)
                  .set('contentFilter', model.contentFilter)
                  .set('trainerFilter', model.trainerFilter)
                  .set('PageSize', model.PageSize.toString())
                  .set('PageNumber', model.PageNumber.toString());

    return this.http.get(this.baseUrl + _api_getCurrentUserMessages, {params});
  }

  getTrainerMessages(model: IUserMessageParams, trainerId: number) {
    const params = new HttpParams()
                  .set('sortType', model.SortType.toString())
                  .set('titleFilter', model.titleFilter)
                  .set('contentFilter', model.contentFilter)
                  .set('trainerFilter', model.trainerFilter)
                  .set('PageSize', model.PageSize.toString())
                  .set('PageNumber', model.PageNumber.toString());
    return this.http.get(this.baseUrl + _api_getCurrentTrainerMessages + '/' + trainerId, {params});
  }

  deleteMessage(messageId: number) {
    return this.http.delete(this.baseUrl + _api_DeleteMessages + '/' + messageId);
  }

  getTrainerMessagesLastWeek() {
    return this.http.get(this.baseUrl + _api_messagesLastWeek);
  }
}
