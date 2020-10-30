import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericsServiceService {
  constructor(private afStore: AngularFirestore, private _http: HttpClient) {}
  addDoc(data: any, collectionName: string): Promise<DocumentReference> {
    return this.afStore.collection(collectionName).add(data);
  }
  deleteDoc(uid: string, collectionName: string): Promise<void> {
    return this.afStore.collection(collectionName).doc(uid).delete();
  }
  updateDoc(uid: string, collectionName: string, data: any): Promise<void> {
    return this.afStore.collection(collectionName).doc(uid).set(data);
  }
  uploadImage(vals: any): Observable<any> {
    let data = vals;
    return this._http.post(
      'https://api.cloudinary.com/v1_1/codexmaker/image/upload',
      data
    );
  }
}
