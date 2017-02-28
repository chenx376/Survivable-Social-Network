import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['chat.component.css'],
  providers: [ChatService]
})

export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;

  constructor(private chatService:ChatService) {
  }

  sendMessage() {
    this.chatService.broadcastMessage(this.message);
    this.message = '';
  }

  ngOnInit() {

    /**
     * Retrieve persisted messages
     */
    this.chatService.retrievePersistedMessages( msgs => {
      this.messages = msgs;
    });

    this.connection = this.chatService.getMessages()
      .subscribe(message => {
      console.log('Event broadcasted and received into Angular2 CHAIN!');
      this.messages.push(message);
    });

  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  getAvatarUrl(username) {
    return 'avatar_tile_' + username.charAt(0) + '_56.png';
  }

}
