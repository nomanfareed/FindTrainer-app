import { DashboardAdminAccountComponent } from './pages/dashboard/dashboard-admin/dashboard-admin-account/dashboard-admin-account.component';
import { DashboardTrainerStatsComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer-stats/dashboard-trainer-stats.component';
import { DashboardUserAccountComponent } from './pages/dashboard/dashboard-user/dashboard-user-account/dashboard-user-account.component';
import { SingleTrainerCertsComponent } from './pages/single-trainer/single-trainer-certs/single-trainer-certs.component';
import { SingleTrainerContactComponent } from './pages/single-trainer/single-trainer-contact/single-trainer-contact.component';
import { SingleTrainerComponent } from './pages/single-trainer/single-trainer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { ServerErrorComponent } from './pages/error/server-error/server-error.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import {
  _notfound_route,
  _server_error,
  _landing_route,
  _login_route,
  _signup_route,
  _trainers_route,
  _trainer_send_message,
  _trainer_certification,
  _trainer_reviews,
  _trainer_write_review,
  _mainUser_route,
  _maintrainer_route,
  _mainAdmin_Route,
  _Dashboard_Account_route,
  _Dashboard_Messages_route,
  _Dashboard_Review_route,
  _Dashboard_Stats_route,
  _Dashboard_Certs_route,
} from './_data/_route';
import { AllTrainerComponent } from './pages/all-trainer/all-trainer.component';
import { SingleTrainerReviewsComponent } from './pages/single-trainer/single-trainer-reviews/single-trainer-reviews.component';
import { SingleTrainerWriteReviewComponent } from './pages/single-trainer/single-trainer-write-review/single-trainer-write-review.component';
import { DashboardUserComponent } from './pages/dashboard/dashboard-user/dashboard-user.component';
import { DashboardUserMessagesComponent } from './pages/dashboard/dashboard-user/dashboard-user-messages/dashboard-user-messages.component';
import { DashboardUserReviewsComponent } from './pages/dashboard/dashboard-user/dashboard-user-reviews/dashboard-user-reviews.component';
import { DashboardTrainerComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer.component';
import { DashboardTrainerAccountComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer-account/dashboard-trainer-account.component';
import { DashboardTrainerCertsComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer-certs/dashboard-trainer-certs.component';
import { DashboardTrainerMessagesComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer-messages/dashboard-trainer-messages.component';
import { DashboardTrainerReviewsComponent } from './pages/dashboard/dashboard-trainer/dashboard-trainer-reviews/dashboard-trainer-reviews.component';
import { DashboardAdminStatsComponent } from './pages/dashboard/dashboard-admin/dashboard-admin-stats/dashboard-admin-stats.component';
import { DashboardAdminCertsComponent } from './pages/dashboard/dashboard-admin/dashboard-admin-certs/dashboard-admin-certs.component';
import { DashboardAdminMessagesComponent } from './pages/dashboard/dashboard-admin/dashboard-admin-messages/dashboard-admin-messages.component';
import { DashboardAdminReviewsComponent } from './pages/dashboard/dashboard-admin/dashboard-admin-reviews/dashboard-admin-reviews.component';

const routes: Routes = [
  { path: _landing_route, component: LandingComponent },
  { path: _login_route, component: LoginComponent },
  { path: _signup_route, component: SignupComponent },
  { path: _trainers_route, component: AllTrainerComponent },
  {
    path: `${_trainers_route}/:id`,
    component: SingleTrainerComponent,
    children: [
      { path: '', redirectTo: _trainer_send_message, pathMatch: 'full' },
      { path: _trainer_send_message, component: SingleTrainerContactComponent },
      {
        path: _trainer_certification,
        component: SingleTrainerCertsComponent,
      },
      { path: _trainer_reviews, component: SingleTrainerReviewsComponent },
      {
        path: _trainer_write_review,
        component: SingleTrainerWriteReviewComponent,
      },
    ],
  },
  //Below Authenticated ONLY ==========================================================
  {
    path: _mainUser_route,
    component: DashboardUserComponent,
    children: [
      { path: '', redirectTo: _Dashboard_Account_route, pathMatch: 'full' },
      {
        path: _Dashboard_Account_route,
        component: DashboardUserAccountComponent,
      },
      {
        path: _Dashboard_Messages_route,
        component: DashboardUserMessagesComponent,
      },
      {
        path: _Dashboard_Review_route,
        component: DashboardUserReviewsComponent,
      },
    ],
  },
  //Below Trainer ONLY ==========================================================
  {
    path: _maintrainer_route,
    component: DashboardTrainerComponent,
    children: [
      { path: '', redirectTo: _Dashboard_Stats_route, pathMatch: 'full' },
      {
        path: _Dashboard_Stats_route,
        component: DashboardTrainerStatsComponent,
      },
      {
        path: _Dashboard_Certs_route,
        component: DashboardTrainerCertsComponent,
      },
      {
        path: _Dashboard_Messages_route,
        component: DashboardTrainerMessagesComponent,
      },
      {
        path: _Dashboard_Review_route,
        component: DashboardTrainerReviewsComponent,
      },
      {
        path: _Dashboard_Account_route,
        component: DashboardTrainerAccountComponent,
      },
    ],
  },
  //Below Admin ONLY==========================================================
  {
    path: _mainAdmin_Route,
    component: DashboardTrainerComponent,
    children: [
      { path: '', redirectTo: _Dashboard_Stats_route, pathMatch: 'full' },
      {
        path: _Dashboard_Stats_route,
        component: DashboardAdminStatsComponent,
      },
      {
        path: _Dashboard_Account_route,
        component: DashboardAdminAccountComponent,
      },
      {
        path: _Dashboard_Certs_route,
        component: DashboardAdminCertsComponent,
      },
      {
        path: _Dashboard_Messages_route,
        component: DashboardAdminMessagesComponent,
      },
      {
        path: _Dashboard_Review_route,
        component: DashboardAdminReviewsComponent,
      },
    ],
  },
  //Error ONLY==========================================================
  { path: _notfound_route, component: NotFoundComponent },
  { path: _server_error, component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
