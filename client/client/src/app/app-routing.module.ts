import { WriteReviewComponent } from './pages/write-review/write-review.component';
import { DashboardUserComponent } from './pages/dashboard/dashboard-user/dashboard-user.component';
import { LandingComponent } from './pages/landing/landing.component';
import {
  _trainers_route,
  _signup_route,
  _login_route,
  _editCertification_route,
  _myMessages_route,
  _dashboardStats_route,
  _landing_route,
  _editAccount_route,
  _mainUser_route,
  _maintrainer_route,
  _trainer_send_message,
  _trainer_certification,
  _trainer_reviews,
  _notfound_route,
  _trainer_write_review,
} from './_data/_route';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlltrainersComponent } from './pages/alltrainers/alltrainers.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SingletrainerComponent } from './pages/singletrainer/singletrainer.component';
import { DashboardUserAccountComponent } from './pages/dashboard/dashboard-user/dashboard-user-account/dashboard-user-account.component';
import { DashboardTrainerAccountComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer-account/dashboard-trainer-account.component';
import { DashboardCertificationsComponent } from './pages/dashboard/dashboard-trainer/dashboard-certifications/dashboard-certifications.component';
import { DashboardMessagesComponent } from './pages/dashboard/dashboard-trainer/dashboard-messages/dashboard-messages.component';
import { DashboardStatsComponent } from './pages/dashboard/dashboard-trainer/dashboard-stats/dashboard-stats.component';
import { DashboardTrainerComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer.component';
import { MessageFormComponent } from './pages/message-form/message-form.component';
import { AllcertsComponent } from './pages/singletrainer/allcerts/allcerts.component';
import { AllreviewsComponent } from './pages/singletrainer/allreviews/allreviews.component';

const routes: Routes = [
  { path: _login_route, component: LoginComponent },
  { path: _signup_route, component: SignupComponent },
  { path: _trainers_route, component: AlltrainersComponent },
  { path: _landing_route, component: LandingComponent },
  {
    path: `${_trainers_route}/:id`,
    component: SingletrainerComponent,
    children: [
      { path: '', redirectTo: _trainer_send_message, pathMatch: 'full' },
      { path: _trainer_send_message, component: MessageFormComponent },
      {
        path: _trainer_certification,
        component: AllcertsComponent,
      },
      { path: _trainer_reviews, component: AllreviewsComponent },
      { path: _trainer_write_review, component: WriteReviewComponent },
    ],
  },
  //=============================== These routes below can only be access by user
  {
    path: _mainUser_route,
    component: DashboardUserComponent,
    children: [
      { path: '', redirectTo: _editAccount_route, pathMatch: 'full' },
      { path: _editAccount_route, component: DashboardUserAccountComponent },
    ],
  },
  //=============================== These routes above can only be access by user
  //=============================== These routes below can only be access by trainer
  {
    path: _maintrainer_route,
    component: DashboardTrainerComponent,
    children: [
      { path: '', redirectTo: _dashboardStats_route, pathMatch: 'full' },
      { path: _dashboardStats_route, component: DashboardStatsComponent },
      {
        path: _editCertification_route,
        component: DashboardCertificationsComponent,
      },
      { path: _myMessages_route, component: DashboardMessagesComponent },
      { path: _editAccount_route, component: DashboardTrainerAccountComponent },
    ],
  },
  // {
  //   path: _notfound_route,
  //   component: NotfoundComponent,
  // },
  // //=============================== These routes above can only be access by trainer
  // { path: '**', redirectTo: _notfound_route, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
