import { UserService } from 'src/app/_services/user.service';
import { CurrentUserStoreDTO } from './../_model/_Interface/IBaseUser';
import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { flatMap, map, mergeMap } from 'rxjs/operators';
import { _collection_certifications } from '../_data/_collections';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { CertificationDTO } from '../_model/_Dto/CertificationDTO';
@Injectable({
  providedIn: 'root',
})
export class CertificationService {
  constructor(
    private afStore: AngularFirestore,
    private AS: AuthService,
    private US: UserService
  ) {}

  private getAllCertificationsFromOneTrainer(
    trainerId: string
  ): Observable<CertificationDTO[]> {
    return this.afStore
      .collection(_collection_certifications, (ref: CollectionReference) => {
        return ref.where('trainerId', '==', trainerId);
      })
      .stateChanges()
      .pipe(
        map((res) =>
          res.map((e) => {
            const data = e.payload.doc.data() as any;
            data.created = new Date(data.created.seconds * 1000);
            data.expired = new Date(data.expired.seconds * 1000);
            return { uid: e.payload.doc.id, ...data } as CertificationDTO;
          })
        )
      );
  }

  getCurrentBrowseingTrainerCerts(): Observable<CertificationDTO[]> {
    return this.AS.CurrentUser$.pipe(
      flatMap((curUser: CurrentUserStoreDTO) => {
        if (curUser) {
          return this.getAllCertificationsFromOneTrainer(
            curUser.browseTrainerId
          );
        }
        return null;
      })
    );
  }

  getCurrentTrainerCerts() {
    return this.AS.getCurrentUser().pipe(
      mergeMap(async (curUser: Promise<CurrentUserStoreDTO>) => {
        const c = await curUser;
        console.log('c', c);
        if (c) {
          return c;
        }
        return null;
      }),
      mergeMap((res: CurrentUserStoreDTO) => {
        return this.getAllCertificationsFromOneTrainer(res.uid);
      })
    );
  }
}
