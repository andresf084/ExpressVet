import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BookMeetingComponent } from './components/bookMeeting/bookMeeting.component';
import { ManageMeetingsComponent } from './components/manageMeetings/manageMeetings.component';
import { MeetingInfoComponent } from './components/meetingInfo/meetingInfo.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "home", component: HomeComponent, pathMatch: "full"},
  {path: "loginUser", component: LoginComponent, pathMatch: "full"},
  {path: "bookMeeting", component: BookMeetingComponent, pathMatch: "full"},
  {path: "manageMeetings", component: ManageMeetingsComponent, pathMatch: "full"},
  {path: "meetingInfo", component: MeetingInfoComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
