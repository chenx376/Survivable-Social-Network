import { Injectable } from '@angular/core';
import { Announcement } from '../../models/announcement.model';
import { STOP_WORDS } from '../../constants/stopWords';

@Injectable()
export class SearchAnnouncementsService {

  announcements: Announcement[] = [];
  private filteredAnnouncements: Announcement[] = [];
  displayedAnnouncements: Announcement[] = [];

  searchTerm = '';
  showMoreAnnouncements = false;

  constructor() { }

  reset = () => {
    this.announcements = [];
    this.filteredAnnouncements = [];
    this.displayedAnnouncements = [];
    this.searchTerm = '';
    this.showMoreAnnouncements = false;
  };

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

}
