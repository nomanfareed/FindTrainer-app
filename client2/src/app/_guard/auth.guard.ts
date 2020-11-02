// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private accountService: AccountService,
//     private toastr: ToastrService
//   ) {}

//   canActivate(): Observable<boolean> {
//     return this.accountService.currentUser$.pipe(
//       map((user) => {
//         if (user) return true;
//         this.toastr.error('You shall not pass!');
//       })
//     );
//   }
// }
