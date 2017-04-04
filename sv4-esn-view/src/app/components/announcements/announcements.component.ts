import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AnnouncementsService } from '../../services/announcements/announcements.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { Announcement } from '../../models/announcement.model';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  announcements: [Announcement];
  announcementContent: string;

  constructor(private announcementsService: AnnouncementsService,
              private dialogService: DialogService,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {

    this.announcementsService.getAnnouncements()
      .subscribe(announcements => {
        this.announcements = announcements;
      });


    //REGISTER TO LISTEN TO EVENTS
    this.announcementsService.listenToAnnouncementEvent()
      .subscribe(  announce => {
        this.announcements.push(announce);
        console.log('Announces received by event: ' + announce.content + ' - ' + announce.publisher );
      } );

  }

  publishAnnouncementButtonClicked = () => {
    this.announcementsService.publishAnnouncement(this.announcementContent)
      .subscribe(
        () => {
          this.announcementContent = '';
          this.dialogService.openAlert(this.viewContainerRef, 'Success', 'Success');
        },
        err => this.dialogService.openAlert(this.viewContainerRef, 'Error', err.message)
      );
  }

}
