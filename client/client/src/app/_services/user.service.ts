import { CurrentUserStoreDTO } from './../_model/_Interface/IBaseUser';
import { AuthService } from 'src/app/_services/auth.service';
import { BaseUserDTO } from './../_model/_Dto/BaseUserDTO';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, flatMap, mergeMap } from 'rxjs/operators';
import { _collection_users } from '../_data/_collections';
import { TrainerDTO } from '../_model/_Dto/BaseUserDTO';
import { FilterParams } from '../_model/_Dto/FilterParamsDTO';
import { Role } from '../_model/_Enum/Role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private CurrentBrowseTrainer = new BehaviorSubject<string>(null);
  currentBrowseTrainer$ = this.CurrentBrowseTrainer.asObservable();
  constructor(private afStore: AngularFirestore, private AS: AuthService) {}

  getAll(filterParams: FilterParams): AngularFirestoreCollection<TrainerDTO> {
    return this.afStore.collection(
      _collection_users,
      (ref: CollectionReference) => {
        let refQuery = ref.where('role', '==', 1);

        //Search
        if (filterParams.Search) {
          refQuery = refQuery.where('name', '==', filterParams.Search);
        }
        //Advanced Search
        if (filterParams.Gender < 1) {
          refQuery = refQuery.where('gender', '==', filterParams.Gender);
        }
        if (filterParams.OnlineTraining < 1) {
          refQuery = refQuery.where(
            'onlineTraining',
            '==',
            filterParams.OnlineTraining === 0 ? false : true
          );
        }
        //Base
        refQuery = refQuery
          .orderBy('avgRatingScore', 'desc')
          .orderBy('totalRatings', 'desc');
        ///Paging
        if (filterParams.LastItem) {
          return refQuery.startAfter(filterParams.LastItem).limit(6);
        } else if (filterParams.FirstItem.length > 0) {
          return refQuery
            .endAt(filterParams.FirstItem[filterParams.FirstItem.length - 1])
            .limitToLast(6);
        } else {
          return refQuery.limit(6);
        }
      }
    );
  }
  getSingleUser(id: string) {
    return this.afStore
      .collection(_collection_users)
      .doc(id)
      .get()
      .pipe(
        map((res) => {
          return { ...res.data(), uid: id };
        })
      );
  }
  getSingleTrainer(id: string): Observable<TrainerDTO | BaseUserDTO> {
    return this.getSingleUser(id).pipe(
      map((res: TrainerDTO | BaseUserDTO) => {
        if (res.role === Role.trainer) {
          const curData: CurrentUserStoreDTO =
            this.AS.CurrentUserSource.value ||
            new CurrentUserStoreDTO(null, null, null);
          curData.browseTrainerId = res.uid;
          this.AS.CurrentUserSource.next(curData);
          return res;
        }
        return null;
      })
    );
  }
  getCurrentTrainerFull() {
    return this.AS.getCurrentUser().pipe(
      mergeMap(async (res: Promise<CurrentUserStoreDTO>) => {
        const r = await res;
        if (r) {
          return r;
        }
        return null;
      }),
      mergeMap((res) => {
        if (res) {
          return this.getSingleTrainer(res.uid);
        }
      })
    );
  }
  EditUser(data: TrainerDTO): Promise<void> {
    return this.afStore
      .collection(_collection_users)
      .doc(data.uid)
      .set(data, { merge: true });
  }
}
