import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from "rxjs";
import { UserService } from '../../services/user/user.service';
import { ChatService } from '../../services/chat/chat.service';
import { Message } from '../../models/message.model';
import { STOP_WORDS } from '../../constants/stopWords';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  private socketConnection: Subscription;

  private publicChat = false;
  private targetUserId: string;

  @ViewChild('messageList') messageList: ElementRef;

  private messages: Message[] = [];
  private filteredMessages: Message[] = [];
  displayedMessages: Message[] = [];

  searchTerm = '';
  messageContent = '';
  showMoreMessages = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.route.url
      .map(url => url[url.length - 1].path)
      .filter(path => path === 'public')
      .subscribe(() => this.publicChat = true);

    this.route.params
      .map(params => params.userId)
      .subscribe(targetUserId => this.targetUserId = targetUserId);

    if (this.targetUserId === this.userService.userId) {
      this.router.navigateByUrl('home');
      return;
    }

    if (this.publicChat) {
      this.chatService.getPublicMessages()
        .subscribe(messages => {
          this.messages = messages;
          this.updateSearch();
          setTimeout(() => {
            this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
          }, 0);
          this.socketConnection = this.chatService.receivePublicMessage()
            .subscribe(message => {
              this.messages.push(message);
              setTimeout(() => {
                this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
              }, 0);
            });
        });
    } else {
      this.chatService.getPrivateMessages(this.targetUserId)
        .subscribe(messages => {
          this.messages = messages;
          setTimeout(() => {
            this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
          }, 0);
          this.socketConnection = this.chatService.receivePrivateMessage()
            .filter(message => message.sender.userId === this.userService.userId || this.router.url === `/chat/${message.sender.userId}`)
            .subscribe(message => {
              this.messages.push(message);
              setTimeout(() => {
                this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
              }, 0);
            });
        });
    }
  }

  updateSearch = () => {
    if (this.searchTerm.trim().length !== 0) {
      if (STOP_WORDS.indexOf(this.searchTerm.trim()) === -1) {
        this.filteredMessages = this.messages
          .filter(announcement => announcement.content.includes(this.searchTerm.trim()));
        if (this.filteredMessages.length > 10) {
          this.displayedMessages = this.filteredMessages.slice(this.filteredMessages.length - 10);
          this.showMoreMessages = true;
        } else {
          this.displayedMessages = this.filteredMessages;
          this.showMoreMessages = false;
        }
      }
    } else {
      this.filteredMessages = this.messages;
      this.displayedMessages = this.filteredMessages;
      this.showMoreMessages = false;
    }
  };

  loadMoreMessagesButtonClicked = () => {
    if (this.displayedMessages.length + 10 < this.filteredMessages.length) {
      this.displayedMessages = this.filteredMessages.slice(this.filteredMessages.length - this.displayedMessages.length - 10)
    } else {
      this.displayedMessages = this.filteredMessages;
      this.showMoreMessages = false;
    }
  };

  sendMessage() {
    if (this.publicChat) {
      this.chatService.sendPublicMessage(this.messageContent);
    } else {
      this.chatService.sendPrivateMessage(this.messageContent, this.targetUserId);
    }
    this.messageContent = '';
  }

  ngOnDestroy() {
    if (this.socketConnection) {
      this.socketConnection.unsubscribe();
    }
  }

}
