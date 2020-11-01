import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextAreaComponent } from './_form/text-area/text-area.component';
import { DateInputComponent } from './_form/date-input/date-input.component';
import { TextInputComponent } from './_form/text-input/text-input.component';
import { MultiSelectComponent } from './_form/multi-select/multi-select.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SingleTrainerComponent } from './pages/single-trainer/single-trainer.component';
import { AllTrainerComponent } from './pages/all-trainer/all-trainer.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardSidebarComponent } from './pages/dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardTrainerComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer.component';
import { DashboardUserComponent } from './pages/dashboard/dashboard-user/dashboard-user.component';
import { CertificationFormComponent } from './components/forms/certification-form/certification-form.component';
import { ReviewFormComponent } from './components/forms/review-form/review-form.component';
import { AccountUserFormComponent } from './components/forms/account-user-form/account-user-form.component';
import { AccountTrainerFormComponent } from './components/forms/account-trainer-form/account-trainer-form.component';
import { ImageUploadFormComponent } from './components/forms/image-upload-form/image-upload-form.component';
import { MessageFormComponent } from './components/forms/message-form/message-form.component';
import { TrainerItemComponent } from './components/items/trainer-item/trainer-item.component';
import { CertsItemComponent } from './components/items/certs-item/certs-item.component';
import { ReviewItemComponent } from './components/items/review-item/review-item.component';
import { MessageItemComponent } from './components/items/message-item/message-item.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { SidebarComponent } from './components/nav/sidebar/sidebar.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { ServerErrorComponent } from './pages/error/server-error/server-error.component';
import { DashboardTrainerAccountComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer-account/dashboard-trainer-account.component';
import { DashboardTrainerStatsComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer-stats/dashboard-trainer-stats.component';
import { DashboardTrainerCertsComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer-certs/dashboard-trainer-certs.component';
import { DashboardTrainerMessagesComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer-messages/dashboard-trainer-messages.component';
import { DashboardTrainerReviewsComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer-reviews/dashboard-trainer-reviews.component';
import { DashboardUserReviewsComponent } from './pages/dashboard/dashboard-user/dashboard-user-reviews/dashboard-user-reviews.component';
import { DashboardUserMessagesComponent } from './pages/dashboard/dashboard-user/dashboard-user-messages/dashboard-user-messages.component';
import { DashboardUserAccountComponent } from './pages/dashboard/dashboard-user/dashboard-user-account/dashboard-user-account.component';
import { DashboardAdminComponent } from './pages/dashboard/dashboard-admin/dashboard-admin.component';
import { DashboardAdminAccountComponent } from './pages/dashboard/dashboard-admin/dashboard-admin-account/dashboard-admin-account.component';
import { DashboardAdminCertsComponent } from './pages/dashboard/dashboard-admin/dashboard-admin-certs/dashboard-admin-certs.component';
import { DashboardAdminMessagesComponent } from './pages/dashboard/dashboard-admin/dashboard-admin-messages/dashboard-admin-messages.component';
import { DashboardAdminReviewsComponent } from './pages/dashboard/dashboard-admin/dashboard-admin-reviews/dashboard-admin-reviews.component';
import { DashboardAdminStatsComponent } from './pages/dashboard/dashboard-admin/dashboard-admin-stats/dashboard-admin-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    TextAreaComponent,
    DateInputComponent,
    TextInputComponent,
    MultiSelectComponent,
    LoginComponent,
    SignupComponent,
    SingleTrainerComponent,
    AllTrainerComponent,
    LandingComponent,
    DashboardComponent,
    DashboardSidebarComponent,
    DashboardTrainerComponent,
    DashboardUserComponent,
    CertificationFormComponent,
    ReviewFormComponent,
    AccountUserFormComponent,
    AccountTrainerFormComponent,
    ImageUploadFormComponent,
    MessageFormComponent,
    TrainerItemComponent,
    CertsItemComponent,
    ReviewItemComponent,
    MessageItemComponent,
    NavbarComponent,
    SidebarComponent,
    NotFoundComponent,
    ServerErrorComponent,
    DashboardTrainerAccountComponent,
    DashboardTrainerStatsComponent,
    DashboardTrainerCertsComponent,
    DashboardTrainerMessagesComponent,
    DashboardTrainerReviewsComponent,
    DashboardUserReviewsComponent,
    DashboardUserMessagesComponent,
    DashboardUserAccountComponent,
    DashboardAdminComponent,
    DashboardAdminAccountComponent,
    DashboardAdminCertsComponent,
    DashboardAdminMessagesComponent,
    DashboardAdminReviewsComponent,
    DashboardAdminStatsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
