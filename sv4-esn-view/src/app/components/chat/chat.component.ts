import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { ChatService } from '../../services/chat/chat.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['chat.component.css'],
  providers: [ChatService]
})

export class ChatComponent implements OnInit, OnDestroy {

  private chatService: ChatService;

  private socketConnection: Subscription;

  messages: [Message];
  message: string;

  constructor(chatService: ChatService) {
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

  getAvatarUrl = (username: string): string => `avatar_tile_${username.charAt(0).toLowerCase()}_56.png`;

  ngOnDestroy() {
    this.socketConnection.unsubscribe();
  }

}
