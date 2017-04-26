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
import { EmailSelectionComponent } from './components/email-selection/email-selection.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LocationComponent } from './components/location/location.component';
import { MapComponent } from './components/map/map.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AlertComponent } from './components/alert/alert.component';
import { MySharedSuppliesComponent} from './components/my-shared-supplies/mysharedsupplies.component';
import { RequestSuppliesComponent} from './components/request-supplies/requestsupplies.component';
import { ConfirmSupplyRequest } from "./components/confirm-supply-request/confirmsupplyrequest.component";

import { HttpService } from './services/http/http.service';
import { UserService } from './services/user/user.service';
import { ChatService } from './services/chat/chat.service';
import { DialogService } from './services/dialog/dialog.service';
import { AnnouncementsService } from './services/announcements/announcements.service';
import { EmailService } from './services/email/email.service';
import { SearchUsersService } from './services/search-users/search-users.service';
import { SearchMessagesService } from './services/search-messages/search-messages.service';
import { SearchAnnouncementsService } from './services/search-announcements/search-announcements.service';
import { EmergencySupplyService } from './services/emergency-supply/emergencySupply.service';
import { SearchEmergencySupplyService } from './services/search-emergency-supplies/search-emergency-supply.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', redirectTo: 'chat/public', pathMatch: 'full' },
  { path: 'chat/public', component: ChatComponent },
  { path: 'chat/:userId', component: ChatComponent },
  { path: 'directory', component: DirectoryComponent },
  { path: 'location', component: LocationComponent },
  { path: 'map', component: MapComponent },
  { path: 'share_status', component: ShareStatusComponent},
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'email', component: EmailSelectionComponent },
  { path: 'email/status/:statusId', component: EmailComponent },
  { path: 'email/:userId', component: EmailComponent },
  { path: 'settings', component: SettingsComponent }
  { path: 'emergencySupplies', component: AnnouncementsComponent },
  { path: 'my-shared-supplies', component: MySharedSuppliesComponent },
  { path: 'request-supplies', component: RequestSuppliesComponent },
  { path: 'confirm-supplyreq/:reqjson', component: ConfirmSupplyRequest }
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
    EmailSelectionComponent,
    SettingsComponent
    LocationComponent,
    MapComponent,
    DialogComponent,
    AlertComponent,
    MySharedSuppliesComponent,
    RequestSuppliesComponent,
    ConfirmSupplyRequest
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
    SearchAnnouncementsService,
    EmergencySupplyService,
    SearchEmergencySupplyService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
