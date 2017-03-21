import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from "rxjs";
import { UserService } from '../../services/user/user.service';
import { ChatService } from '../../services/chat/chat.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['chat.component.css'],
  providers: [ChatService]
})

export class ChatComponent implements OnInit, OnDestroy {

  private route: ActivatedRoute;
  private userService: UserService;
  private chatService: ChatService;

  private socketConnection: Subscription;

  @ViewChild('messageList') messageList: ElementRef;

  messages: [Message];
  message: string;

  constructor(route: ActivatedRoute,
              userService: UserService,
              chatService: ChatService) {
    this.route = route;
    this.userService = userService;
    this.chatService = chatService;
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => console.log(params['userId']));

    this.chatService.getPublicMessages()
      .subscribe(messages => {
        this.messages = messages;
        setTimeout(() => {
          this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
        }, 0);
        this.socketConnection = this.chatService.receiveMessage()
          .subscribe(message => {
            this.messages.push(message);
            setTimeout(() => {
              this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
            }, 0);
          });
      });
  }

  sendMessage() {
    this.chatService.broadcastMessage(this.message);
    this.message = '';
  }

  ngOnDestroy() {
    this.socketConnection.unsubscribe();
  }

}
