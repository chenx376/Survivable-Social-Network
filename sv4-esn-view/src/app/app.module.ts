import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppComponent } from './components/root/app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { ShareStatusComponent } from './components/share-status/share-status.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { EmailComponent } from './components/email/email.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AlertComponent } from './components/alert/alert.component';

import { HttpService } from './services/http/http.service';
import { UserService } from './services/user/user.service';
import { ChatService } from './services/chat/chat.service';
import { DialogService } from './services/dialog/dialog.service';
import { AnnouncementsService } from './services/announcements/announcements.service';
import { EmailService } from './services/email/email.service';
import { SearchUsersService } from './services/search-users/search-users.service';
import { SearchMessagesService } from './services/search-messages/search-messages.service';
import { SearchAnnouncementsService } from './services/search-announcements/search-announcements.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', redirectTo: 'chat/public', pathMatch: 'full' },
  { path: 'chat/public', component: ChatComponent },
  { path: 'chat/:userId', component: ChatComponent },
  { path: 'directory', component: DirectoryComponent },
  { path: 'share_status', component: ShareStatusComponent},
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'email', component: EmailComponent },
  { path: 'email/:userId', component: EmailComponent }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ChatComponent,
    DirectoryComponent,
    ShareStatusComponent,
    AnnouncementsComponent,
    EmailComponent,
    DialogComponent,
    AlertComponent
  ],
  entryComponents: [
    DialogComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpService,
    UserService,
    ChatService,
    AnnouncementsService,
    EmailService,
    DialogService,
    SearchUsersService,
    SearchMessagesService,
    SearchAnnouncementsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
