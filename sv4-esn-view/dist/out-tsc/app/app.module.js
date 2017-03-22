var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { AppComponent } from './components/root/app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { ShareStatusComponent } from './components/share-status/share-status.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AlertComponent } from './components/alert/alert.component';
import { HttpService } from './services/http/http.service';
import { UserService } from './services/user/user.service';
import { ChatService } from './services/chat/chat.service';
import { DialogService } from './services/dialog/dialog.service';
import { AnnouncementsService } from './services/announcements/announcements.service';
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'chat', redirectTo: 'chat/public', pathMatch: 'full' },
    { path: 'chat/public', component: ChatComponent },
    { path: 'chat/:userId', component: ChatComponent },
    { path: 'directory', component: DirectoryComponent },
    { path: 'share_status', component: ShareStatusComponent },
    { path: 'announcements', component: AnnouncementsComponent }
    // { path: '**', component: PageNotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            LoginComponent,
            HomeComponent,
            ChatComponent,
            DirectoryComponent,
            ShareStatusComponent,
            AnnouncementsComponent,
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
            MaterialModule
        ],
        providers: [
            HttpService,
            UserService,
            ChatService,
            AnnouncementsService,
            DialogService
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/app.module.js.map