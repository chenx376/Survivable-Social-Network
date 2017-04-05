import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AnnouncementsService } from '../../services/announcements/announcements.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { Announcement } from '../../models/announcement.model';
import { STOP_WORDS } from '../../constants/stopWords';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  private announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  displayedAnnouncements: Announcement[] = [];

  searchTerm = '';
  announcementContent = '';
  showMoreAnnouncements = false;

  constructor(private announcementsService: AnnouncementsService,
              private dialogService: DialogService,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.announcementsService.getAnnouncements()
      .subscribe(announcements => {
        this.announcements = announcements;
        this.updateSearch();
      });

    this.announcementsService.listenToAnnouncementEvent()
      .subscribe(announcement => {
        this.announcements.push(announcement);
      });
  }

  updateSearch = () => {
    if (this.searchTerm.trim().length !== 0) {
      if (STOP_WORDS.indexOf(this.searchTerm.trim()) === -1) {
        this.filteredAnnouncements = this.announcements
          .filter(announcement => announcement.content.includes(this.searchTerm.trim()));
        if (this.filteredAnnouncements.length > 10) {
          this.displayedAnnouncements = this.filteredAnnouncements.slice(0, 10);
          this.showMoreAnnouncements = true;
        } else {
          this.displayedAnnouncements = this.filteredAnnouncements;
          this.showMoreAnnouncements = false;
        }
      }
    } else {
      this.filteredAnnouncements = this.announcements;
      this.displayedAnnouncements = this.filteredAnnouncements;
      this.showMoreAnnouncements = false;
    }
  };

  loadMoreAnnouncementsButtonClicked = () => {
    if (this.displayedAnnouncements.length + 10 < this.filteredAnnouncements.length) {
      this.displayedAnnouncements = this.filteredAnnouncements.slice(0, this.displayedAnnouncements.length + 10)
    } else {
      this.displayedAnnouncements = this.filteredAnnouncements;
      this.showMoreAnnouncements = false;
    }
  };

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
