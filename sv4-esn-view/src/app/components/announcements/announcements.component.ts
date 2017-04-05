import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AnnouncementsService } from '../../services/announcements/announcements.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { SearchAnnouncementsService } from '../../services/search-announcements/search-announcements.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  announcementContent = '';

  constructor(private announcementsService: AnnouncementsService,
              private dialogService: DialogService,
              private viewContainerRef: ViewContainerRef,
              private searchAnnouncementsService: SearchAnnouncementsService ) { }

  ngOnInit() {
    this.announcementsService.getAnnouncements()
      .subscribe(announcements => {
        this.searchAnnouncementsService.announcements = announcements;
        this.searchAnnouncementsService.updateSearch();
      });

    this.announcementsService.listenToAnnouncementEvent()
      .subscribe(announcement => {
        this.searchAnnouncementsService.announcements.push(announcement);
      });
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
