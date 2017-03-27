import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from "rxjs";
import { UserService } from '../../services/user/user.service';
import { ChatService } from '../../services/chat/chat.service';
import { Message } from '../../models/message.model';

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

  messages: [Message];
  messageContent: string;

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

  sendMessage() {
    if (this.publicChat) {
      this.chatService.sendPublicMessage(this.messageContent);
    } else {
      this.chatService.sendPrivateMessage(this.messageContent, this.targetUserId);
    }
    this.messageContent = '';
  }

  ngOnDestroy() {
    if (this.socketConnection != null) {
      this.socketConnection.unsubscribe();
    }
  }

}
