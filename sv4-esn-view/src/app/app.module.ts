import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './components/root/app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { HttpService } from './services/http/http.service';
import { UserService } from './services/user/user.service';
import { ChatService } from './services/chat/chat.service';
import { DialogService } from './services/dialog/dialog.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'directory', component: DirectoryComponent },
  { path: 'chat', component: ChatComponent }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ChatComponent,
    DirectoryComponent,
    DialogComponent,
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    HttpService,
    UserService,
    DialogService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
