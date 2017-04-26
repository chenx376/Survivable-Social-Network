import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { AnnouncementsService } from '../../services/announcements/announcements.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { SearchAnnouncementsService } from '../../services/search-announcements/search-announcements.service';
import { EmailService } from '../../services/email/email.service';



@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  announcementContent = '';

  constructor(private announcementsService: AnnouncementsService,
              private dialogService: DialogService,
              private emailService: EmailService,
              private viewContainerRef: ViewContainerRef,
              private searchAnnouncementsService: SearchAnnouncementsService,
              private elementRef: ElementRef,
              ) { }

  ngOnInit() {
    this.announcementsService.getAnnouncements()
      .subscribe(announcements => {
        this.searchAnnouncementsService.reset();
        this.searchAnnouncementsService.announcements = announcements;
        this.searchAnnouncementsService.updateSearch();
      });

    this.announcementsService.listenToAnnouncementEvent()
      .subscribe(announcement => {
        this.searchAnnouncementsService.announcements.unshift(announcement);
        this.searchAnnouncementsService.updateSearch();
      });
  }

  publishAnnouncementButtonClicked = () => {
    this.announcementsService.publishAnnouncement(this.announcementContent)
      .subscribe(
        () => {

            this.emailService.getReceiversGroupInSubscription()
                .map(users => users.sort((user1, user2) => {
                  if (user1.online && !user2.online) {
                    return -1;
                  } else if (!user1.online && user2.online) {
                    return 1;
                  } else {
                    if (user1.username > user2.username) {
                      return 1;
                    } else if (user1.username < user2.username) {
                      return -1;
                    } else {
                      return 0;
                    }
                  }
                }))
                .subscribe(users => {
                  console.log(users);
                  var m_receivers_group = [];
                  users.forEach(function(user){
                      m_receivers_group.push(user.userId);
                  })
                  this.emailService.sendGroupEmail("New Announcement", this.announcementContent, m_receivers_group)
                    .subscribe(
                      () => {
                          this.announcementContent = '';
                          this.dialogService.openAlert(this.viewContainerRef, 'Success', 'Success')
                            .subscribe(() => setTimeout(() => this.elementRef.nativeElement.scrollTop = 0, 0));
                      },
                      err => {}
                    );
                });
        },
        err => this.dialogService.openAlert(this.viewContainerRef, 'Error', err.message)
      );
  }


}
