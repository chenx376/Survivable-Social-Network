import { Component, OnInit, OnDestroy } from '@angular/core';
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

  private userService: UserService;
  private chatService: ChatService;

  private socketConnection: Subscription;

  messages: [Message];
  message: string;

  constructor(userService: UserService, chatService: ChatService) {
    this.userService = userService;
    this.chatService = chatService
  }

  ngOnInit() {
    this.chatService.getPublicMessages()
      .subscribe(messages => {

        this.messages = messages;
        this.socketConnection = this.chatService.receiveMessage()
          .subscribe(message => {
            this.messages.push(message);
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
