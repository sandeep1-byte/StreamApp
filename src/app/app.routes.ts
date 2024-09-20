import { Routes } from '@angular/router';

import { SignUpComponent } from '../../src/app/user/signup/signUp.component';
import { UpdatePasswordComponent } from './admin/admin-dashboard/updatepassword/updatepassword.component';
import { SignInComponent } from '../../src/app/user/signin/signin.component';
import { LogoutuserComponent } from './admin/admin-dashboard/logoutuser/logoutuser.component';
import { ForgetpasswordComponent } from '../../src/app/user/forgetpassword/forgetpassword.component';
import { OtpcomponentComponent } from '../../src/app/user/otpcomponent/otpcomponent.component';
import { ResetPasswordComponent } from '../../src/app/user/reset-password/reset-password.component';
import {AdminDashboardComponent} from '../app/admin/admin-dashboard/admin-dashboard.component'
import { CreateVideoComponent } from './admin/create-video/create-video.component';
import { VideoListComponent } from './admin/video-list/video-list.component';
import { UpdateVideoComponent } from './admin/admin-dashboard/update-video/update-video.component';

export const routes: Routes = [
    
  { path: '', component: SignUpComponent, pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'forgetPassword', component: ForgetpasswordComponent },
  { path: 'verifyOTP', component: OtpcomponentComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },

  {
 path: 'dashboard',  component: AdminDashboardComponent, children: [
  { path: 'updatepassword', component: UpdatePasswordComponent },
  { path: 'Logout', component:LogoutuserComponent},
  { path: 'uploadvideo', component: CreateVideoComponent },
  { path: 'videoslist', component: VideoListComponent },
  { path: 'UpdateVideo', component: UpdateVideoComponent }
  ]
}];
