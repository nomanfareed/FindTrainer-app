import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RatingModule } from 'ngx-bootstrap/rating'; //Ngx-bootstrap

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SingletrainerComponent } from './pages/singletrainer/singletrainer.component';
import { AlltrainersComponent } from './pages/alltrainers/alltrainers.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FormsModule } from '@angular/forms';
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainerItemComponent } from './components/trainer-item/trainer-item.component';
import { RatingComponent } from './components/rating/rating.component';
import { CommonModule } from '@angular/common';
import { DashboardSidebarComponent } from './pages/dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardUserAccountComponent } from './pages/dashboard/dashboard-user/dashboard-user-account/dashboard-user-account.component';
import { DashboardTrainerComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer.component';
import { DashboardUserComponent } from './pages/dashboard/dashboard-user/dashboard-user.component';
import { DashboardMessagesComponent } from './pages/dashboard/dashboard-trainer/dashboard-messages/dashboard-messages.component';
import { DashboardCertificationsComponent } from './pages/dashboard/dashboard-trainer/dashboard-certifications/dashboard-certifications.component';
import { DashboardTrainerAccountComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer-account/dashboard-trainer-account.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './_form/text-input/text-input.component';
import { DateInputComponent } from './_form/date-input/date-input.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
// 2. Add your credentials from step 1
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateBaseUserComponent } from './components/update-base-user/update-base-user.component';
import { UpdateTrainerComponent } from './components/update-trainer/update-trainer.component';
import { MultiselectComponent } from './_form/multiselect/multiselect.component';
import { UpdateProfileImageComponent } from './components/update-profile-image/update-profile-image.component';
import { AddUpdateCertificationsComponent } from './components/add-update-certifications/add-update-certifications.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MessageFormComponent } from './pages/message-form/message-form.component';
import { DisplayCertificationsComponent } from './components/display-certifications/display-certifications.component';
import { AllcertsComponent } from './pages/singletrainer/allcerts/allcerts.component';
import { AllreviewsComponent } from './pages/singletrainer/allreviews/allreviews.component';
import { DisplayReviewsComponent } from './components/display-reviews/display-reviews.component';
import { ErrorComponent } from './pages/error/error.component';
import { WriteReviewComponent } from './pages/write-review/write-review.component';
import { TextAreaComponent } from './_form/text-area/text-area.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    SingletrainerComponent,
    AlltrainersComponent,
    LandingComponent,
    TrainerItemComponent,
    RatingComponent,
    DashboardMessagesComponent,
    DashboardTrainerComponent,
    DashboardSidebarComponent,
    DashboardUserComponent,
    DashboardCertificationsComponent,
    DashboardUserComponent,
    DashboardTrainerAccountComponent,
    DashboardUserAccountComponent,
    DashboardTrainerComponent,
    DashboardUserComponent,
    TextInputComponent,
    DateInputComponent,
    UploadImageComponent,
    UpdateBaseUserComponent,
    UpdateTrainerComponent,
    MultiselectComponent,
    UpdateProfileImageComponent,
    AddUpdateCertificationsComponent,
    MessageFormComponent,
    DashboardCertificationsComponent,
    DisplayReviewsComponent,
    DisplayCertificationsComponent,
    AllcertsComponent,
    AllreviewsComponent,
    ErrorComponent,
    WriteReviewComponent,
    TextAreaComponent,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    RatingModule.forRoot(),
    BrowserModule,
    NgxSpinnerModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CommonModule,
    ImageCropperModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgbModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoaderInterceptorServiceInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
